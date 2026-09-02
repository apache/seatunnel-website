import React, {useEffect, useRef, useState} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import config from "./languages.json";
import avatarSrc from "./github-avatars.json";
import contributorData from "./pr-contributors.json";
import Layout from '@theme/Layout';
import './index.less';

const avatarByUserId = new Map(
    avatarSrc.map((item) => [item.id, "data:image/png;base64," + item.avatar_base64])
);

/**
 * Returns the embedded avatar for listed team members and a bounded GitHub thumbnail for
 * generated contributors. The size constraint prevents the network view from downloading
 * hundreds of original-resolution images when it enters the viewport.
 */
function getAvatarUrl(member) {
    const avatarUrl = avatarByUserId.get(member.userId) || member.avatarUrl || "";

    if (!avatarUrl.startsWith("https://avatars.githubusercontent.com/")) {
        return avatarUrl;
    }
    return avatarUrl + (avatarUrl.includes("?") ? "&" : "?") + "s=64";
}

const ORBIT_GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const AVATAR_LOAD_CONCURRENCY = 8;
const PARTICLE_COUNT = 120;

/**
 * Creates stable three-dimensional positions for every contributor in the orbit.
 * The golden-angle distribution avoids visible rows while retaining a reproducible layout.
 */
function createOrbitNodes(contributors) {
    const total = contributors.length;

    return contributors.map((member, index) => {
        const vertical = 1 - (index / Math.max(1, total - 1)) * 2;
        const radial = Math.sqrt(Math.max(0, 1 - vertical * vertical));
        const angle = index * ORBIT_GOLDEN_ANGLE;
        const fill = 0.55 + ((index * 37) % 100) / 220;

        return {
            member,
            x: Math.cos(angle) * radial * fill,
            y: vertical * fill * 0.88,
            z: Math.sin(angle) * radial * fill * 0.55,
            size: index % 23 === 0 ? 20 : index % 7 === 0 ? 15 : 11,
            progress: 0,
        };
    });
}

/**
 * Rotates an orbit point and projects it into the two-dimensional canvas viewport.
 * The returned depth controls drawing order, scale, and opacity for the 3D effect.
 */
function projectOrbitPoint(node, rotationY, rotationX, width, height, zoom) {
    const entrance = 1 - Math.pow(1 - node.progress, 3);
    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);
    const x = (node.x * cosY + node.z * sinY) * entrance;
    const z = (-node.x * sinY + node.z * cosY) * entrance;
    const y = (node.y * cosX - z * sinX) * entrance;
    const depth = node.y * sinX + z * cosX;
    const depthRatio = Math.max(0, Math.min(1, (depth + 0.8) / 1.6));
    const scale = 0.42 + depthRatio * 0.58;

    return {
        node,
        x: width / 2 + x * width * 0.52 * zoom,
        y: height / 2 + y * height * 0.43 * zoom,
        depth,
        radius: node.size * scale,
        opacity: 0.35 + depthRatio * 0.65,
    };
}

/**
 * Returns the smallest rotational delta so focus transitions never spin the orbit the long way.
 */
function shortestAngle(from, to) {
    return ((to - from + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
}

/**
 * Draws an avatar or an initials fallback without creating an additional DOM image per frame.
 */
function drawOrbitAvatar(context, projected, image, highlighted) {
    const {member} = projected.node;
    const radius = projected.radius * (highlighted ? 1.55 : 1);
    const outerRadius = radius + 2;

    context.save();
    context.beginPath();
    context.arc(projected.x, projected.y, radius, 0, Math.PI * 2);
    context.clip();
    if (image) {
        context.drawImage(image, projected.x - radius, projected.y - radius, radius * 2, radius * 2);
    } else {
        context.fillStyle = projected.node.size > 15 ? '#2e6aed' : '#35aaa9';
        context.fillRect(projected.x - radius, projected.y - radius, radius * 2, radius * 2);
        context.fillStyle = '#ffffff';
        context.font = '600 ' + Math.max(9, radius * 0.82) + 'px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText((member.name || member.githubId).slice(0, 1).toUpperCase(), projected.x, projected.y + 1);
    }
    context.restore();

    context.beginPath();
    context.arc(projected.x, projected.y, outerRadius, 0, Math.PI * 2);
    context.lineWidth = highlighted ? 3 : 2;
    context.strokeStyle = projected.node.size > 15 ? '#2e6aed' : 'rgba(46, 184, 167, 0.86)';
    context.stroke();
}

function TeamSection({title, description, members}) {
    return (
        <>
            <h3 className="team_title">{title}</h3>
            <p className="team_desc">{description}</p>
            <ul className="character_list">
                {
                    members.map((item) => (
                        <li className="character_item text_center" key={item.key || item.githubId} style={{listStyle: "none"}}>
                            <a href={item.profileUrl || "https://github.com/" + item.githubId} target="_blank" rel="noreferrer">
                                <img className="character_avatar" src={getAvatarUrl(item)} alt={item.name}/>
                                <div className="character_desc">
                                    <h3 className="character_id"><span className="githubId">githubId:</span>{item.githubId}</h3>
                                </div>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

/**
 * Renders the generated GitHub contributor list as a draggable three-dimensional orbit.
 * Canvas provides smooth depth animation and an equivalent keyboard interaction model.
 */
function ContributorNetwork({contributors, countLabel, hint, profileLabel, controlsLabel}) {
    const canvasRef = useRef(null);
    const [activeMember, setActiveMember] = useState(null);
    const [profilePinned, setProfilePinned] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }

        const context = canvas.getContext('2d');
        if (!context) {
            return undefined;
        }
        const nodes = createOrbitNodes(contributors);
        const images = new Map();
        const particles = Array.from({length: PARTICLE_COUNT}, (_, index) => ({
            x: ((index * 73) % 101) / 100,
            y: ((index * 31) % 101) / 100,
            depth: ((index * 47) % 101) / 100,
            size: 0.6 + ((index * 19) % 10) / 10,
        }));
        let disposed = false;
        let animationFrame = 0;
        let width = 0;
        let height = 0;
        let pixelRatio = 1;
        let rotationY = 0.4;
        let rotationX = 0.18;
        let targetRotationY = rotationY;
        let targetRotationX = rotationX;
        let velocityY = 0;
        let velocityX = 0;
        let zoom = 1;
        let targetZoom = 1;
        let dragging = false;
        let moved = false;
        let pointerX = 0;
        let pointerY = 0;
        let lastTime = performance.now();
        let activeNode = null;
        let pinnedNode = null;
        let projectedNodes = [];
        let isVisible = false;
        let assetsRequested = false;
        let nextAvatarIndex = 0;
        let activeAvatarLoads = 0;
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, rect.width);
            height = Math.max(1, rect.height);
            canvas.width = Math.round(width * pixelRatio);
            canvas.height = Math.round(height * pixelRatio);
        }

        function updateActiveNode(nextNode) {
            if (activeNode === nextNode) {
                return;
            }
            activeNode = nextNode;
            setActiveMember(nextNode ? nextNode.member : null);
        }

        function loadAvatars() {
            while (isVisible && !disposed && activeAvatarLoads < AVATAR_LOAD_CONCURRENCY && nextAvatarIndex < contributors.length) {
                const member = contributors[nextAvatarIndex++];
                const image = new Image();
                const imageKey = member.key || member.githubId;
                activeAvatarLoads += 1;
                image.crossOrigin = 'anonymous';
                image.onload = function () {
                    if (!disposed) {
                        images.set(imageKey, image);
                        requestDraw();
                    }
                    activeAvatarLoads -= 1;
                    loadAvatars();
                };
                image.onerror = function () {
                    activeAvatarLoads -= 1;
                    loadAvatars();
                };
                image.src = getAvatarUrl(member);
            }
        }

        const centerLogo = new Image();
        centerLogo.onload = function () {
            if (!disposed) {
                requestDraw();
            }
        };

        /**
         * Defers network and animation work until the contributor network is actually visible.
         * This keeps the entrance animation observable and avoids consuming resources above the fold.
         */
        function activateOrbit() {
            isVisible = true;
            lastTime = performance.now();
            if (!assetsRequested) {
                assetsRequested = true;
                centerLogo.src = '/image/logo.png';
            }
            loadAvatars();
            requestDraw();
        }

        function drawCenterMark() {
            const radius = 60;

            context.save();
            context.beginPath();
            context.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
            context.fillStyle = '#ffffff';
            context.fill();
            context.lineWidth = 3;
            context.strokeStyle = '#2e6aed';
            context.stroke();
            if (centerLogo.complete && centerLogo.naturalWidth) {
                context.drawImage(centerLogo, width / 2 - 38, height / 2 - 42, 76, 82);
            }
            context.restore();
        }

        function drawScene() {
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            context.clearRect(0, 0, width, height);

            particles.forEach((particle) => {
                const x = particle.x * width + Math.sin(rotationY + particle.y * Math.PI) * 16;
                const y = particle.y * height + Math.cos(rotationY + particle.x * Math.PI) * 8;
                context.beginPath();
                context.arc(x, y, particle.size + particle.depth, 0, Math.PI * 2);
                context.fillStyle = 'rgba(65, 156, 230, ' + (0.08 + particle.depth * 0.18) + ')';
                context.fill();
            });

            projectedNodes = nodes.map((node) => projectOrbitPoint(node, rotationY, rotationX, width, height, zoom));
            context.lineWidth = 1;
            projectedNodes.forEach((projected) => {
                context.beginPath();
                context.moveTo(width / 2, height / 2);
                context.lineTo(projected.x, projected.y);
                context.strokeStyle = 'rgba(69, 125, 241, ' + (0.04 + projected.opacity * 0.1) + ')';
                context.stroke();
            });

            projectedNodes.sort((left, right) => left.depth - right.depth).forEach((projected) => {
                const imageKey = projected.node.member.key || projected.node.member.githubId;
                const highlighted = projected.node === activeNode || projected.node === pinnedNode;
                context.globalAlpha = projected.opacity;
                drawOrbitAvatar(context, projected, images.get(imageKey), highlighted);
            });
            context.globalAlpha = 1;
            drawCenterMark();
        }

        function isStillAnimating() {
            return isVisible && (!reduceMotion || dragging || Math.abs(velocityY) > 0.0001 || Math.abs(velocityX) > 0.0001 || pinnedNode || nodes.some((node) => node.progress < 1));
        }

        function animate(timestamp) {
            const delta = Math.min(2, (timestamp - lastTime) / 16.67);
            lastTime = timestamp;
            animationFrame = 0;
            nodes.forEach((node) => {
                node.progress = Math.min(1, node.progress + 0.035 * delta);
            });
            if (pinnedNode) {
                rotationY += shortestAngle(rotationY, targetRotationY) * 0.055;
                rotationX += (targetRotationX - rotationX) * 0.055;
            } else if (!dragging) {
                rotationY += velocityY + (reduceMotion ? 0 : 0.0007 * delta);
                rotationX += velocityX;
                velocityY *= 0.965;
                velocityX *= 0.94;
                rotationX += (0.15 - rotationX) * 0.006;
                rotationX = Math.max(-1.1, Math.min(1.1, rotationX));
            }
            zoom += (targetZoom - zoom) * 0.05;
            drawScene();
            if (!disposed && isStillAnimating()) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        function requestDraw() {
            if (isVisible && !animationFrame) {
                animationFrame = requestAnimationFrame(animate);
            }
        }

        function getPointerPosition(event) {
            const rect = canvas.getBoundingClientRect();
            return {x: event.clientX - rect.left, y: event.clientY - rect.top};
        }

        function pickNode(position) {
            let closest = null;
            let shortestDistance = Infinity;
            projectedNodes.forEach((projected) => {
                const distance = Math.hypot(projected.x - position.x, projected.y - position.y);
                if (distance <= projected.radius + 8 && distance < shortestDistance) {
                    closest = projected.node;
                    shortestDistance = distance;
                }
            });
            return closest;
        }

        function focusNode(node) {
            const targetY = Math.atan2(-node.x, node.z);
            const rotatedZ = -node.x * Math.sin(targetY) + node.z * Math.cos(targetY);
            targetRotationY = rotationY + shortestAngle(rotationY, targetY);
            targetRotationX = Math.max(-0.8, Math.min(0.8, Math.atan2(node.y, rotatedZ)));
            pinnedNode = node;
            targetZoom = 1.22;
        }

        function releaseFocus() {
            pinnedNode = null;
            targetZoom = 1;
            setProfilePinned(false);
            updateActiveNode(null);
        }

        function onPointerDown(event) {
            const position = getPointerPosition(event);
            dragging = true;
            moved = false;
            pointerX = position.x;
            pointerY = position.y;
            velocityY = 0;
            velocityX = 0;
            canvas.setPointerCapture(event.pointerId);
            canvas.style.cursor = 'grabbing';
            requestDraw();
        }

        function onPointerMove(event) {
            const position = getPointerPosition(event);
            if (dragging) {
                const deltaX = position.x - pointerX;
                const deltaY = position.y - pointerY;
                if (Math.abs(deltaX) + Math.abs(deltaY) > 2) {
                    moved = true;
                    releaseFocus();
                }
                velocityY = deltaX * 0.006;
                velocityX = deltaY * 0.006;
                rotationY += velocityY;
                rotationX = Math.max(-1.1, Math.min(1.1, rotationX + velocityX));
                pointerX = position.x;
                pointerY = position.y;
                requestDraw();
                return;
            }
            const nextNode = pickNode(position);
            if (!pinnedNode) {
                updateActiveNode(nextNode);
            }
            canvas.style.cursor = nextNode ? 'pointer' : 'grab';
        }

        function onPointerUp(event) {
            dragging = false;
            if (canvas.hasPointerCapture(event.pointerId)) {
                canvas.releasePointerCapture(event.pointerId);
            }
            canvas.style.cursor = 'grab';
            requestDraw();
        }

        function onClick(event) {
            if (moved) {
                return;
            }
            const node = pickNode(getPointerPosition(event));
            if (node) {
                updateActiveNode(node);
                setProfilePinned(true);
                focusNode(node);
            } else {
                releaseFocus();
            }
            requestDraw();
        }

        function onPointerLeave() {
            if (!pinnedNode && !dragging) {
                updateActiveNode(null);
            }
        }

        /**
         * Selects an adjacent contributor without introducing hundreds of invisible tab stops.
         */
        function selectAdjacentNode(direction) {
            const activeIndex = activeNode ? nodes.indexOf(activeNode) : direction > 0 ? -1 : 0;
            const nextIndex = (activeIndex + direction + nodes.length) % nodes.length;
            const nextNode = nodes[nextIndex];

            pinnedNode = null;
            targetZoom = 1;
            updateActiveNode(nextNode);
            setProfilePinned(false);
            requestDraw();
        }

        function onKeyDown(event) {
            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                selectAdjacentNode(1);
                return;
            }
            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                selectAdjacentNode(-1);
                return;
            }
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const node = activeNode || nodes[0];
                updateActiveNode(node);
                setProfilePinned(true);
                focusNode(node);
                requestDraw();
                return;
            }
            if (event.key === 'Escape') {
                event.preventDefault();
                releaseFocus();
                requestDraw();
            }
        }

        const resizeObserver = new ResizeObserver(function () {
            resizeCanvas();
            requestDraw();
        });
        const intersectionObserver = 'IntersectionObserver' in window
            ? new IntersectionObserver(function (entries) {
                isVisible = entries.some((entry) => entry.isIntersecting);
                if (isVisible) {
                    activateOrbit();
                } else if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                    animationFrame = 0;
                }
            }, {threshold: 0.01})
            : null;
        resizeObserver.observe(canvas);
        if (intersectionObserver) {
            intersectionObserver.observe(canvas);
        }
        canvas.addEventListener('pointerdown', onPointerDown);
        canvas.addEventListener('pointermove', onPointerMove);
        canvas.addEventListener('pointerup', onPointerUp);
        canvas.addEventListener('pointercancel', onPointerUp);
        canvas.addEventListener('pointerleave', onPointerLeave);
        canvas.addEventListener('click', onClick);
        canvas.addEventListener('keydown', onKeyDown);
        resizeCanvas();
        if (!intersectionObserver) {
            activateOrbit();
        }

        return function () {
            disposed = true;
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            resizeObserver.disconnect();
            if (intersectionObserver) {
                intersectionObserver.disconnect();
            }
            canvas.removeEventListener('pointerdown', onPointerDown);
            canvas.removeEventListener('pointermove', onPointerMove);
            canvas.removeEventListener('pointerup', onPointerUp);
            canvas.removeEventListener('pointercancel', onPointerUp);
            canvas.removeEventListener('pointerleave', onPointerLeave);
            canvas.removeEventListener('click', onClick);
            canvas.removeEventListener('keydown', onKeyDown);
        };
    }, [contributors]);

    return (
        <section className="contributor_network" aria-labelledby="contributors-title">
            <canvas
                className="contributor_network_canvas"
                ref={canvasRef}
                role="application"
                tabIndex="0"
                aria-label={controlsLabel}
                aria-describedby="contributor-network-hint"
            />
            <div className="contributor_network_count">{countLabel.replace('{count}', String(contributors.length))}</div>
            <div className={'contributor_network_readout' + (activeMember ? ' show' : '')} aria-live="polite">
                {activeMember && (
                    <>
                        <strong>{activeMember.name || activeMember.githubId}</strong>
                        <span>{activeMember.githubId}</span>
                        {profilePinned && (
                            <a href={activeMember.profileUrl || "https://github.com/" + activeMember.githubId} target="_blank" rel="noreferrer">{profileLabel}</a>
                        )}
                    </>
                )}
            </div>
            <p className="contributor_network_hint" id="contributor-network-hint">{hint}</p>
        </section>
    );
}

export default function () {
    const isBrowser = useIsBrowser();
    const language = isBrowser && location.pathname.indexOf('/zh-CN/') === 0 ? 'zh-CN' : 'en';
    const dataSource = config?.[language];
    const contributors = contributorData.contributors || contributorData;
    const contributorSummary = contributorData.summary || {
        displayedContributors: contributors.length,
        existingTeamContributors: 0,
        totalContributors: contributors.length,
    };
    const contributorDesc = dataSource.info.prContributorDesc
        .replace('{count}', String(contributorSummary.displayedContributors))
        .replace('{existingCount}', String(contributorSummary.existingTeamContributors))
        .replace('{totalCount}', String(contributorSummary.totalContributors));

    return (
        <Layout>
            <div className="team_page">
                <div className="block">
                    <h3 className="team_title">SeaTunnel Team</h3>
                    <p className="team_desc" dangerouslySetInnerHTML={ { __html: dataSource.info.desc } }/>

                    <TeamSection title="PMC" description={dataSource.info.tip} members={config.pmc}/>

                    <TeamSection title="Committer" description={dataSource.info.tip} members={config.committer}/>
                    <h3 className="team_title" id="contributors-title">{dataSource.info.prContributorTitle}</h3>
                    <p className="team_desc">{contributorDesc}</p>
                </div>
                <ContributorNetwork
                    contributors={contributors}
                    countLabel={dataSource.info.prContributorNetworkCount}
                    hint={dataSource.info.prContributorNetworkHint}
                    profileLabel={dataSource.info.prContributorNetworkProfile}
                    controlsLabel={dataSource.info.prContributorNetworkControls}
                />
            </div>
        </Layout>
    );
}

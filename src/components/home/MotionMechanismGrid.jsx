/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';

const MOTION_CYCLE_SECONDS = 8;
const FRAME_INTERVAL_MS = 1000 / 30;
const PARALLEL_SPLITS = Array.from({length: 6}, (_, index) => ({
    id: `S${index + 1}`,
    owner: index % 3,
    start: 0.35 + index * 0.62,
}));
const CDC_EVENTS = [
    {start: 0.4, op: 'S', id: 41, value: 'NEW'},
    {start: 1.45, op: 'S', id: 42, value: 'NEW'},
    {start: 3, op: 'I', id: 43, value: 'NEW'},
    {start: 4.2, op: 'U', id: 42, value: 'PAID'},
    {start: 5.55, op: 'D', id: 41, value: null},
];
const TRANSFORMS = [
    {id: 1, name: 'Ada', start: 0.45},
    {id: 0, name: 'Temp', start: 2.35},
    {id: 2, name: 'Lin', start: 4.25},
];

function cubicPoint(progress, path) {
    const clampedProgress = Math.min(1, Math.max(0, progress));
    const inverseProgress = 1 - clampedProgress;

    return {
        x:
            inverseProgress ** 3 * path[0] +
            3 * inverseProgress ** 2 * clampedProgress * path[2] +
            3 * inverseProgress * clampedProgress ** 2 * path[4] +
            clampedProgress ** 3 * path[6],
        y:
            inverseProgress ** 3 * path[1] +
            3 * inverseProgress ** 2 * clampedProgress * path[3] +
            3 * inverseProgress * clampedProgress ** 2 * path[5] +
            clampedProgress ** 3 * path[7],
    };
}

function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

        updatePreference();
        mediaQuery.addEventListener('change', updatePreference);
        return () => mediaQuery.removeEventListener('change', updatePreference);
    }, []);

    return prefersReducedMotion;
}

function useMotionClock(isPaused) {
    const [time, setTime] = React.useState(0);
    const timeRef = React.useRef(0);

    React.useEffect(() => {
        timeRef.current = time;
    }, [time]);

    React.useEffect(() => {
        if (isPaused) {
            return undefined;
        }

        let animationFrame;
        let previousFrame;
        let lastRender = 0;

        const tick = (now) => {
            if (previousFrame === undefined) {
                previousFrame = now;
            }

            timeRef.current = (timeRef.current + (now - previousFrame) / 1000) % MOTION_CYCLE_SECONDS;
            previousFrame = now;

            if (now - lastRender >= FRAME_INTERVAL_MS) {
                setTime(timeRef.current);
                lastRender = now;
            }

            animationFrame = window.requestAnimationFrame(tick);
        };

        animationFrame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(animationFrame);
    }, [isPaused]);

    return time;
}

function Arrow({x, y}) {
    return <path d={`M${x - 6} ${y - 5}l6 5-6 5`} className="st-home-motion-diagram-arrow" fill="none" />;
}

function MovingPacket({label = '', path, progress, tone = 'blue', width = 30}) {
    if (progress < 0 || progress > 1) {
        return null;
    }

    const point = cubicPoint(progress, path);

    if (!label) {
        return (
            <g transform={`translate(${point.x} ${point.y})`} className={`st-home-motion-diagram-moving-signal-${tone}`}>
                <circle r="7" className="st-home-motion-diagram-moving-signal" />
                <circle r="3" className="st-home-motion-diagram-moving-signal-core" />
            </g>
        );
    }

    return (
        <g transform={`translate(${point.x} ${point.y})`}>
            <rect x={-width / 2} y="-12" width={width} height="24" rx="7" className={`st-home-motion-diagram-moving-packet-${tone}`} />
            <text y="5" textAnchor="middle" className={`st-home-motion-diagram-moving-packet-copy-${tone}`}>{label}</text>
        </g>
    );
}

function cdcRows(time, isTarget) {
    const rows = new Map(isTarget ? [] : [[41, 'NEW'], [42, 'NEW']]);

    CDC_EVENTS.forEach((event) => {
        const eventTime = isTarget ? event.start + 0.9 : event.start;
        if ((isTarget || event.op !== 'S') && time >= eventTime) {
            if (event.op === 'D') {
                rows.delete(event.id);
            } else {
                rows.set(event.id, event.value);
            }
        }
    });

    return [...rows.entries()];
}

function CdcTable({x, rows}) {
    return (
        <>
            <rect x={x} y="31" width="136" height="103" rx="9" className="st-home-motion-diagram-node" />
            <rect x={x + 1} y="32" width="134" height="24" rx="7" className="st-home-motion-diagram-soft" />
            <text x={x + 13} y="48" className="st-home-motion-diagram-label">id</text><text x={x + 60} y="48" className="st-home-motion-diagram-label">status</text>
            {rows.length === 0 ? <text x={x + 13} y="77" className="st-home-motion-diagram-muted-copy">waiting…</text> : rows.map(([id, value], index) => <g key={id}><text x={x + 13} y={77 + index * 26} className="st-home-motion-diagram-copy">{id}</text><text x={x + 60} y={77 + index * 26} className="st-home-motion-diagram-copy">{value}</text></g>)}
        </>
    );
}

function transformedRows(time) {
    return TRANSFORMS.filter((transform) => transform.id > 0 && time >= transform.start + 1.65);
}

function ParallelReadsDiagram({time}) {
    const readerYPositions = [54, 87, 120];

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">SOURCE SPLITS</text>
            <text x="207" y="20" className="st-home-motion-diagram-label">READERS</text>
            <text x="438" y="20" className="st-home-motion-diagram-label">TARGET</text>
            <rect x="16" y="32" width="118" height="112" rx="10" className="st-home-motion-diagram-node" />
            {PARALLEL_SPLITS.map((split, index) => {
                const x = 28 + (index % 2) * 49;
                const y = 45 + Math.floor(index / 2) * 31;
                const isWaiting = time < split.start;
                return (
                    <g key={split.id}>
                        <rect x={x} y={y} width="39" height="22" rx="5" className={isWaiting ? 'st-home-motion-diagram-chip' : 'st-home-motion-diagram-soft'} />
                        <text x={x + 19.5} y={y + 15} textAnchor="middle" className="st-home-motion-diagram-chip-text">{split.id}</text>
                    </g>
                );
            })}
            {readerYPositions.map((y, index) => (
                <g key={y}>
                    <path d={`M134 88 C168 88 174 ${y} 204 ${y}`} className="st-home-motion-diagram-line" fill="none" />
                    <rect x="205" y={y - 13} width="121" height="26" rx="7" className="st-home-motion-diagram-node" />
                    <circle cx="220" cy={y} r="3.5" className={index === 1 ? 'st-home-motion-diagram-teal-fill' : 'st-home-motion-diagram-blue-fill'} />
                    <text x="232" y={y + 5} className="st-home-motion-diagram-copy">Reader {index + 1}</text>
                    <path d={`M326 ${y} C364 ${y} 384 88 428 88`} className="st-home-motion-diagram-line" fill="none" />
                </g>
            ))}
            <Arrow x="427" y="88" />
            <ellipse cx="466" cy="67" rx="27" ry="7" className="st-home-motion-diagram-node" />
            <path d="M439 67v43c0 9 54 9 54 0V67" className="st-home-motion-diagram-node" />
            <path d="M439 89c0 9 54 9 54 0M439 110c0 9 54 9 54 0" className="st-home-motion-diagram-line" fill="none" />
            {PARALLEL_SPLITS.map((split) => {
                const readerY = readerYPositions[split.owner];
                const tone = split.owner === 1 ? 'teal' : 'blue';
                return (
                    <React.Fragment key={split.id}>
                        <MovingPacket label={split.id} path={[134, 88, 168, 88, 174, readerY, 204, readerY]} progress={(time - split.start) / 1.25} tone={tone} width={32} />
                        <MovingPacket label={split.id} path={[326, readerY, 364, readerY, 384, 88, 428, 88]} progress={(time - split.start - 1.25) / 1.25} tone={tone} width={32} />
                    </React.Fragment>
                );
            })}
        </svg>
    );
}

function SnapshotCdcDiagram({time}) {
    const sourceRows = cdcRows(time, false);
    const targetRows = cdcRows(time, true);

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">MYSQL / ORDERS</text>
            <text x="373" y="20" className="st-home-motion-diagram-label">TARGET / ORDERS</text>
            <CdcTable x={16} rows={sourceRows} />
            <rect x="201" y="24" width="98" height="23" rx="12" className="st-home-motion-diagram-soft" />
            <text x="250" y="40" textAnchor="middle" className="st-home-motion-diagram-accent-text">{time < 2.8 ? 'SNAPSHOT' : 'BINLOG'}</text>
            <path d="M153 82H367" className="st-home-motion-diagram-line" fill="none" />
            <Arrow x="367" y="82" />
            <text x="260" y="116" textAnchor="middle" className="st-home-motion-diagram-copy">SeaTunnel</text>
            <CdcTable x={370} rows={targetRows} />
            {CDC_EVENTS.map((event) => (
                <MovingPacket key={`${event.op}-${event.id}-${event.start}`} label={`${event.op}:${event.id}`} path={[153, 82, 210, 82, 310, 82, 367, 82]} progress={(time - event.start) / 0.9} tone={event.op === 'S' || event.op === 'I' ? 'teal' : 'blue'} width={43} />
            ))}
        </svg>
    );
}

function TransformDiagram({time}) {
    const outputRows = transformedRows(time);

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">INPUT</text>
            <text x="218" y="20" className="st-home-motion-diagram-label">ROW SQL</text>
            <text x="421" y="20" className="st-home-motion-diagram-label">OUTPUT</text>
            <rect x="16" y="31" width="125" height="91" rx="9" className="st-home-motion-diagram-node" />
            <text x="28" y="57" className="st-home-motion-diagram-copy">1&nbsp;&nbsp; Ada</text>
            <text x="28" y="82" className="st-home-motion-diagram-copy">0&nbsp;&nbsp; Temp</text>
            <text x="28" y="107" className="st-home-motion-diagram-copy">2&nbsp;&nbsp; Lin</text>
            <path d="M142 76H206M315 76h84" className="st-home-motion-diagram-line" fill="none" />
            <Arrow x="399" y="76" />
            <rect x="207" y="48" width="108" height="56" rx="13" className="st-home-motion-diagram-blue" />
            <text x="261" y="82" textAnchor="middle" className="st-home-motion-diagram-on-blue st-home-motion-diagram-sql">SQL</text>
            <rect x="402" y="31" width="102" height="91" rx="9" className="st-home-motion-diagram-node" />
            {outputRows.length === 0 ? <text x="413" y="77" className="st-home-motion-diagram-muted-copy">waiting…</text> : outputRows.map((row, index) => <text key={row.id} x="413" y={60 + index * 27} className="st-home-motion-diagram-teal-copy">{row.id}&nbsp;&nbsp; {row.name}_</text>)}
            <text x="18" y="144" className="st-home-motion-diagram-code">CONCAT(name, '_')</text>
            {TRANSFORMS.map((transform) => (
                <React.Fragment key={transform.id}>
                    <MovingPacket label={String(transform.id)} path={[142, 76, 164, 76, 184, 76, 206, 76]} progress={(time - transform.start) / 0.65} width={22} />
                    {transform.id > 0 ? <MovingPacket label={String(transform.id)} path={[315, 76, 344, 76, 371, 76, 399, 76]} progress={(time - transform.start - 0.85) / 0.8} tone="teal" width={22} /> : <MovingPacket label="0" path={[261, 105, 261, 117, 261, 126, 261, 136]} progress={(time - transform.start - 0.65) / 0.7} width={22} />}
                </React.Fragment>
            ))}
        </svg>
    );
}

function RoutingDiagram({time}) {
    const rows = ['users', 'orders', 'items'];
    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            {rows.map((table, index) => {
                const y = 39 + index * 43;
                const tone = index === 1 ? 'teal' : 'blue';
                const sourcePath = [144, y + 15, 179, y + 15, 189, 82, 221, 82];
                const targetPath = [299, 82, 333, 82, 343, y + 15, 376, y + 15];
                return (
                    <g key={table}>
                        <rect x="16" y={y} width="127" height="30" rx="7" className="st-home-motion-diagram-node" />
                        <rect x="377" y={y} width="127" height="30" rx="7" className="st-home-motion-diagram-node" />
                        <rect x="28" y={y + 8} width="16" height="14" rx="2" className="st-home-motion-diagram-table" />
                        <rect x="389" y={y + 8} width="16" height="14" rx="2" className="st-home-motion-diagram-table" />
                        <text x="55" y={y + 20} className="st-home-motion-diagram-copy">{table}</text>
                        <text x="416" y={y + 20} className="st-home-motion-diagram-copy">{table}</text>
                        <path d={`M144 ${y + 15} C179 ${y + 15} 189 82 221 82M299 82 C333 82 343 ${y + 15} 376 ${y + 15}`} className="st-home-motion-diagram-line" fill="none" />
                        <Arrow x="375" y={y + 15} />
                        {[0, 1].map((round) => {
                            const start = 0.35 + index * 0.5 + round * 3;
                            const label = table[0].toUpperCase();
                            return (
                                <React.Fragment key={start}>
                                    <MovingPacket label={label} path={sourcePath} progress={(time - start) / 1.15} tone={tone} width={22} />
                                    <MovingPacket label={label} path={targetPath} progress={(time - start - 1.15) / 1.15} tone={tone} width={22} />
                                </React.Fragment>
                            );
                        })}
                    </g>
                );
            })}
            <rect x="221" y="52" width="78" height="61" rx="12" className="st-home-motion-diagram-blue" />
            <text x="260" y="78" textAnchor="middle" className="st-home-motion-diagram-on-blue">Table</text>
            <text x="260" y="98" textAnchor="middle" className="st-home-motion-diagram-on-blue">route</text>
        </svg>
    );
}

function SchemaDiagram({time}) {
    const rows = [['id', 'BIGINT'], ['name', 'VARCHAR'], ['region', 'VARCHAR']];
    const sourceColumnCount = time >= 1.1 ? 3 : 2;
    const sinkColumnCount = time >= 3.8 ? 3 : 2;

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">MYSQL SOURCE</text>
            <text x="371" y="20" className="st-home-motion-diagram-label">JDBC MYSQL SINK</text>
            {[16, 369].map((x) => <rect key={x} x={x} y="31" width="135" height="104" rx="9" className="st-home-motion-diagram-node" />)}
            {[16, 369].map((x) => <g key={x}><rect x={x + 1} y="32" width="133" height="24" rx="7" className="st-home-motion-diagram-soft" /><text x={x + 14} y="48" className="st-home-motion-diagram-copy">▦&nbsp; customers</text></g>)}
            {rows.map(([name, type], index) => {
                const y = 76 + index * 24;
                return (
                    <g key={name}>
                        {index === 2 && index < sourceColumnCount ? <rect x="22" y={y - 16} width="123" height="22" rx="4" className="st-home-motion-diagram-highlight" /> : null}
                        {index < sourceColumnCount ? <><text x="29" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-copy'}>{name}</text><text x="92" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-code'}>{type}</text></> : null}
                        {index === 2 && index < sinkColumnCount ? <rect x="375" y={y - 16} width="123" height="22" rx="4" className="st-home-motion-diagram-highlight" /> : null}
                        {index < sinkColumnCount ? <><text x="382" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-copy'}>{name}</text><text x="445" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-code'}>{type}</text></> : null}
                    </g>
                );
            })}
            <path d="M152 82H364" className="st-home-motion-diagram-line" fill="none" /><Arrow x="364" y="82" />
            <rect x="225" y="48" width="58" height="22" rx="11" className="st-home-motion-diagram-soft" /><text x="254" y="64" textAnchor="middle" className="st-home-motion-diagram-accent-text">DDL</text>
            <MovingPacket label="ADD" path={[152, 82, 220, 82, 300, 82, 364, 82]} progress={(time - 1.4) / 2.4} width={36} />
            <MovingPacket label="ROW" path={[152, 82, 220, 82, 300, 82, 364, 82]} progress={(time - 5) / 1.1} tone="teal" width={38} />
        </svg>
    );
}

function CheckpointDiagram({time}) {
    const isComplete = time >= 2.7;
    const isRestoring = time >= 4.65 && time < 5.55;
    const isWriterLost = time >= 3.65 && time < 4.65;
    const signalProgress = time < 1.1 ? time / 0.9 : (time - 5.55) / 0.9;
    const showSignals = time < 1.1 || (time >= 5.55 && time < 7.4);

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <path d="M122 70h70M327 70h70" className="st-home-motion-diagram-line" fill="none" /><Arrow x="192" y="70" /><Arrow x="397" y="70" />
            {['Source', 'Writer', 'Sink'].map((label, index) => {
                const x = [16, 198, 403][index];
                const isLostWriter = label === 'Writer' && isWriterLost;
                return <g key={label}><rect x={x} y="47" width="104" height="43" rx="10" className={isLostWriter ? 'st-home-motion-diagram-blue' : 'st-home-motion-diagram-node'} /><text x={x + 52} y="74" textAnchor="middle" className={isLostWriter ? 'st-home-motion-diagram-on-blue' : 'st-home-motion-diagram-strong'}>{isLostWriter ? 'Worker lost' : label}</text></g>;
            })}
            <path d="M68 91C68 130 157 137 215 137M250 91v25" className="st-home-motion-diagram-line" fill="none" />
            <rect x="215" y="114" width="134" height="38" rx="9" className={isComplete ? 'st-home-motion-diagram-soft' : 'st-home-motion-diagram-node'} />
            <text x="282" y="135" textAnchor="middle" className="st-home-motion-diagram-copy">{isComplete ? 'Checkpoint #42' : 'Checkpoint state'}</text>
            <text x="282" y="147" textAnchor="middle" className={isComplete ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-label'}>{isComplete ? 'COMPLETED' : 'PENDING'}</text>
            {showSignals ? <>
                {[0, 1].map((offset) => <React.Fragment key={offset}>
                    <MovingPacket path={[122, 70, 145, 70, 170, 70, 192, 70]} progress={signalProgress - offset * 0.48} tone="teal" />
                    <MovingPacket path={[327, 70, 350, 70, 375, 70, 397, 70]} progress={signalProgress - offset * 0.48 + 0.2} tone="teal" />
                </React.Fragment>)}
            </> : null}
            <MovingPacket label="BARRIER" path={[93, 30, 225, 30, 350, 30, 488, 30]} progress={(time - 1.1) / 1.6} width={54} />
            {isRestoring ? <MovingPacket path={[215, 137, 165, 137, 112, 121, 68, 91]} progress={(time - 4.65) / 0.9} /> : null}
        </svg>
    );
}

function MotionDiagram({type, time}) {
    const diagrams = {
        parallel: <ParallelReadsDiagram time={time} />,
        cdc: <SnapshotCdcDiagram time={time} />,
        transform: <TransformDiagram time={time} />,
        routing: <RoutingDiagram time={time} />,
        schema: <SchemaDiagram time={time} />,
        checkpoint: <CheckpointDiagram time={time} />,
    };

    return diagrams[type];
}

export default function MotionMechanismGrid({caption, controls, gridLabel, mechanisms}) {
    const [isMotionPaused, setIsMotionPaused] = React.useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();
    const time = useMotionClock(isMotionPaused || prefersReducedMotion);

    return (
        <>
            <div className="st-home-motion-toolbar" role="group" aria-label={controls.label}>
                <button
                    type="button"
                    className="st-home-motion-control"
                    aria-pressed={isMotionPaused}
                    disabled={prefersReducedMotion}
                    onClick={() => setIsMotionPaused((paused) => !paused)}
                >
                    {isMotionPaused ? controls.play : controls.pause}
                </button>
            </div>
            <ul className="st-home-motion-grid" aria-label={gridLabel}>
                {mechanisms.map((mechanism, index) => (
                    <li key={mechanism.title} className={`st-home-motion-card st-home-motion-card-${mechanism.diagram}`}>
                        <article>
                            <div className="st-home-motion-card-heading">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3>{mechanism.title}</h3>
                                    <p>{mechanism.description}</p>
                                </div>
                            </div>
                            <div className="st-home-motion-visual"><MotionDiagram type={mechanism.diagram} time={time} /></div>
                            <p className="st-home-motion-card-detail">{mechanism.detail}</p>
                            <p className="st-home-motion-card-note">{mechanism.note}</p>
                        </article>
                    </li>
                ))}
            </ul>
            <p className="st-home-motion-caption">{caption}</p>
        </>
    );
}

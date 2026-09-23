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
const FOCUS_CYCLE_SECONDS = 24;
const LOOP_TRANSITION_START_SECONDS = 7.5;
const PARALLEL_SPLITS = [
    {id: 'S1', owner: 2, start: 0.35},
    {id: 'S2', owner: 0, start: 0.97},
    {id: 'S3', owner: 1, start: 1.59},
    {id: 'S4', owner: 2, start: 2.21},
    {id: 'S5', owner: 0, start: 2.83},
    {id: 'S6', owner: 1, start: 3.45},
];
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
const DEFAULT_DIAGRAM_LABELS = {
    barrier: 'BARRIER',
    binlog: 'BINLOG',
    checkpoint: 'Checkpoint',
    checkpointState: 'Checkpoint state',
    completed: 'COMPLETED',
    customers: 'customers',
    input: 'INPUT',
    jdbcMysqlSink: 'JDBC MySQL sink',
    mysqlOrders: 'MySQL / orders',
    mysqlSource: 'MySQL source',
    output: 'OUTPUT',
    pending: 'PENDING',
    reader: 'Reader',
    readers: 'READERS',
    route: 'route',
    rowSql: 'ROW SQL',
    sink: 'Sink',
    snapshot: 'SNAPSHOT',
    source: 'Source',
    sourceSplits: 'SOURCE SPLITS',
    table: 'Table',
    target: 'TARGET',
    targetOrders: 'Target / orders',
    waiting: 'waiting…',
    workerLost: 'Worker lost',
    writer: 'Writer',
    applied: 'applied',
    filtered: 'id = 0 filtered',
    region: 'region',
    status: {
        cdcDeleteArrived: 'DELETE · row 41 is removed.',
        cdcDeleteStarted: 'DELETE · remove row 41',
        cdcInsert: 'INSERT · new row 43',
        cdcSnapshot: 'Read existing rows.',
        cdcUpdate: 'UPDATE · row 42 becomes PAID',
        checkpointBarrier: 'Capture state with a checkpoint barrier.',
        checkpointComplete: 'Checkpoint #42 completed and retained.',
        checkpointFailure: 'A worker fails after checkpoint #42.',
        checkpointRestore: 'Restore saved source state from #42.',
        checkpointRunning: 'Running · source and sink connected.',
        checkpointResumed: 'Resumed · replay after the saved position.',
        parallelComplete: '6 illustrated splits delivered.',
        parallelRunning: 'Assigned splits move through 3 readers.',
        routing: 'Table ID → matching destination writer.',
        schema: 'schema-changes.enabled = true',
        transform: "WHERE id > 0 · CONCAT(name, '_')",
    },
};

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
    const [clock, setClock] = React.useState({activeIndex: 0, activeProgress: 0, time: 0});
    const elapsedTimeRef = React.useRef(0);
    const isPausedRef = React.useRef(isPaused);

    React.useEffect(() => {
        isPausedRef.current = isPaused;
    }, [isPaused]);

    React.useEffect(() => {
        let animationFrame;
        let previousFrame;

        const tick = (now) => {
            if (previousFrame === undefined) {
                previousFrame = now;
            }

            if (!isPausedRef.current) {
                elapsedTimeRef.current += (now - previousFrame) / 1000;
                const focusTime = elapsedTimeRef.current % FOCUS_CYCLE_SECONDS;
                setClock({
                    activeIndex: Math.floor(focusTime / 4),
                    activeProgress: (focusTime % 4) / 4,
                    time: elapsedTimeRef.current % MOTION_CYCLE_SECONDS,
                });
            }
            previousFrame = now;

            // Keep the frame reference current while paused so playback resumes without a time jump.
            animationFrame = window.requestAnimationFrame(tick);
        };

        animationFrame = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(animationFrame);
    }, []);

    return clock;
}

function smooth(progress) {
    const clampedProgress = Math.min(1, Math.max(0, progress));
    return clampedProgress * clampedProgress * (3 - 2 * clampedProgress);
}

function Arrow({x, y}) {
    return <path d={`M${x - 6} ${y - 5}l6 5-6 5`} className="st-home-motion-diagram-arrow" fill="none" />;
}

function CheckMark({x, y}) {
    return <path d={`M${x - 5} ${y}l4 4 8-9`} className="st-home-motion-diagram-check" fill="none" />;
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

function CdcTable({labels, x, rows}) {
    return (
        <>
            <rect x={x} y="31" width="136" height="103" rx="9" className="st-home-motion-diagram-node" />
            <rect x={x + 1} y="32" width="134" height="24" rx="7" className="st-home-motion-diagram-soft" />
            <text x={x + 13} y="48" className="st-home-motion-diagram-label">id</text><text x={x + 60} y="48" className="st-home-motion-diagram-label">status</text>
            {rows.length === 0 ? <text x={x + 13} y="77" className="st-home-motion-diagram-muted-copy">{labels.waiting}</text> : rows.map(([id, value], index) => {
                const y = 77 + index * 26;
                const isPaid = value === 'PAID';
                return <g key={id}>{isPaid ? <rect x={x + 5} y={y - 17} width="126" height="23" rx="5" className="st-home-motion-diagram-highlight" /> : null}<text x={x + 13} y={y} className={isPaid ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-copy'}>{id}</text><text x={x + 60} y={y} className={isPaid ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-copy'}>{value}</text></g>;
            })}
        </>
    );
}

function transformedRows(time) {
    return TRANSFORMS.filter((transform) => transform.id > 0 && time >= transform.start + 1.65);
}

function ParallelReadsDiagram({labels, time}) {
    const readerYPositions = [54, 87, 120];
    const readerTones = ['blue', 'teal', 'dark'];
    const completedSplitCount = PARALLEL_SPLITS.filter((split) => time >= split.start + 2.5).length;

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">{labels.sourceSplits}</text>
            <text x="207" y="20" className="st-home-motion-diagram-label">{labels.readers}</text>
            <text x="438" y="20" className="st-home-motion-diagram-label">{labels.target}</text>
            <rect x="16" y="32" width="118" height="112" rx="10" className="st-home-motion-diagram-node" />
            {PARALLEL_SPLITS.map((split, index) => {
                const x = 28 + (index % 2) * 49;
                const y = 45 + Math.floor(index / 2) * 31;
                const isWaiting = time < split.start;
                const tone = readerTones[split.owner];
                return (
                    <g key={split.id}>
                        <rect x={x} y={y} width="39" height="22" rx="5" className={isWaiting ? 'st-home-motion-diagram-chip' : 'st-home-motion-diagram-stage'} />
                        <text x={x + 19.5} y={y + 15} textAnchor="middle" className={isWaiting ? `st-home-motion-diagram-chip-text-${tone}` : 'st-home-motion-diagram-muted-copy'}>{split.id}</text>
                    </g>
                );
            })}
            {readerYPositions.map((y, index) => (
                <g key={y}>
                    <path d={`M134 88 C168 88 174 ${y} 204 ${y}`} className="st-home-motion-diagram-line" fill="none" />
                    <rect x="205" y={y - 13} width="121" height="26" rx="7" className={`st-home-motion-diagram-node st-home-motion-diagram-reader-${readerTones[index]}`} />
                    <circle cx="220" cy={y} r="3.5" className={`st-home-motion-diagram-${readerTones[index]}-fill`} />
                    <text x="232" y={y + 5} className="st-home-motion-diagram-copy">{labels.reader} {index + 1}</text>
                    <path d={`M326 ${y} C364 ${y} 384 88 428 88`} className="st-home-motion-diagram-line" fill="none" />
                </g>
            ))}
            <Arrow x="427" y="88" />
            <ellipse cx="466" cy="67" rx="27" ry="7" className="st-home-motion-diagram-database" />
            <path d="M439 67v43c0 9 54 9 54 0V67" className="st-home-motion-diagram-database" />
            <path d="M439 89c0 9 54 9 54 0M439 110c0 9 54 9 54 0" className="st-home-motion-diagram-line" fill="none" />
            <rect x="431" y="139" width="70" height="18" rx="9" className="st-home-motion-diagram-soft" />
            <text x="466" y="152" textAnchor="middle" className="st-home-motion-diagram-accent-text">{completedSplitCount} / 6</text>
            {PARALLEL_SPLITS.map((split) => {
                const readerY = readerYPositions[split.owner];
                const tone = readerTones[split.owner];
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

function SnapshotCdcDiagram({labels, time}) {
    const sourceRows = cdcRows(time, false);
    const targetRows = cdcRows(time, true);

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">{labels.mysqlOrders}</text>
            <text x="373" y="20" className="st-home-motion-diagram-label">{labels.targetOrders}</text>
            <CdcTable labels={labels} x={16} rows={sourceRows} />
            <rect x="201" y="24" width="98" height="23" rx="12" className="st-home-motion-diagram-soft" />
            <text x="250" y="40" textAnchor="middle" className="st-home-motion-diagram-accent-text">{time < 2.8 ? labels.snapshot : labels.binlog}</text>
            <path d="M153 82H367" className="st-home-motion-diagram-line" fill="none" />
            <Arrow x="367" y="82" />
            <text x="260" y="116" textAnchor="middle" className="st-home-motion-diagram-copy">SeaTunnel</text>
            <CdcTable labels={labels} x={370} rows={targetRows} />
            {CDC_EVENTS.map((event) => (
                <MovingPacket key={`${event.op}-${event.id}-${event.start}`} label={`${event.op}:${event.id}`} path={[153, 82, 210, 82, 310, 82, 367, 82]} progress={(time - event.start) / 0.9} tone={event.op === 'S' || event.op === 'I' ? 'teal' : 'blue'} width={43} />
            ))}
        </svg>
    );
}

function TransformDiagram({labels, time}) {
    const outputRows = transformedRows(time);
    const isFiltered = time >= 3;

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">{labels.input}</text>
            <text x="218" y="20" className="st-home-motion-diagram-label">{labels.rowSql}</text>
            <text x="421" y="20" className="st-home-motion-diagram-label">{labels.output}</text>
            <rect x="16" y="31" width="125" height="91" rx="9" className="st-home-motion-diagram-node" />
            <text x="28" y="57" className="st-home-motion-diagram-copy">1&nbsp;&nbsp; Ada</text>
            <text x="28" y="82" className="st-home-motion-diagram-muted-copy">0&nbsp;&nbsp; Temp</text>
            <text x="28" y="107" className="st-home-motion-diagram-copy">2&nbsp;&nbsp; Lin</text>
            <path d="M142 76H206M315 76h84" className="st-home-motion-diagram-line" fill="none" />
            <Arrow x="399" y="76" />
            <rect x="207" y="48" width="108" height="56" rx="13" className="st-home-motion-diagram-blue" />
            <text x="261" y="82" textAnchor="middle" className="st-home-motion-diagram-on-blue st-home-motion-diagram-sql">Sql</text>
            <rect x="402" y="31" width="102" height="91" rx="9" className="st-home-motion-diagram-node" />
            {outputRows.length === 0 ? <text x="413" y="77" className="st-home-motion-diagram-muted-copy">{labels.waiting}</text> : outputRows.map((row, index) => <text key={row.id} x="413" y={60 + index * 27} className="st-home-motion-diagram-teal-copy">{row.id}&nbsp;&nbsp; {row.name}_</text>)}
            {isFiltered ? <><circle cx="261" cy="144" r="7" className="st-home-motion-diagram-filter-icon" /><path d="M257 148l8-8" className="st-home-motion-diagram-filter-mark" fill="none" /><text x="278" y="148" className="st-home-motion-diagram-muted-copy">{labels.filtered}</text></> : <text x="18" y="144" className="st-home-motion-diagram-code">CONCAT(name, '_')</text>}
            {TRANSFORMS.map((transform) => (
                <React.Fragment key={transform.id}>
                    <MovingPacket label={String(transform.id)} path={[142, 76, 164, 76, 184, 76, 206, 76]} progress={(time - transform.start) / 0.65} width={22} />
                    {transform.id > 0 ? <MovingPacket label={String(transform.id)} path={[315, 76, 344, 76, 371, 76, 399, 76]} progress={(time - transform.start - 0.85) / 0.8} tone="teal" width={22} /> : <MovingPacket label="0" path={[261, 105, 261, 117, 261, 126, 261, 136]} progress={(time - transform.start - 0.65) / 0.7} tone="dark" width={22} />}
                </React.Fragment>
            ))}
        </svg>
    );
}

function RoutingDiagram({labels, time}) {
    const rows = ['users', 'orders', 'items'];
    const rowTones = ['blue', 'teal', 'dark'];
    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            {rows.map((table, index) => {
                const y = 39 + index * 43;
                const tone = rowTones[index];
                const sourcePath = [144, y + 15, 179, y + 15, 189, 82, 221, 82];
                const targetPath = [299, 82, 333, 82, 343, y + 15, 376, y + 15];
                return (
                    <g key={table}>
                        <rect x="16" y={y} width="127" height="30" rx="7" className="st-home-motion-diagram-node" />
                        <rect x="377" y={y} width="127" height="30" rx="7" className="st-home-motion-diagram-node" />
                        <rect x="28" y={y + 8} width="16" height="14" rx="2" className={`st-home-motion-diagram-table st-home-motion-diagram-table-${tone}`} />
                        <rect x="389" y={y + 8} width="16" height="14" rx="2" className={`st-home-motion-diagram-table st-home-motion-diagram-table-${tone}`} />
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
            <text x="260" y="78" textAnchor="middle" className="st-home-motion-diagram-on-blue">{labels.table}</text>
            <text x="260" y="98" textAnchor="middle" className="st-home-motion-diagram-on-blue">{labels.route}</text>
        </svg>
    );
}

function SchemaDiagram({labels, time}) {
    const rows = [['id', 'BIGINT'], ['name', 'VARCHAR'], ['region', 'VARCHAR']];
    const sourceColumnCount = time >= 1.1 ? 3 : 2;
    const sinkColumnCount = time >= 3.8 ? 3 : 2;

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">{labels.mysqlSource}</text>
            <text x="371" y="20" className="st-home-motion-diagram-label">{labels.jdbcMysqlSink}</text>
            {[16, 369].map((x) => <rect key={x} x={x} y="31" width="135" height="104" rx="9" className="st-home-motion-diagram-node" />)}
            {[16, 369].map((x) => <g key={x}><rect x={x + 1} y="32" width="133" height="24" rx="7" className="st-home-motion-diagram-soft" /><text x={x + 14} y="48" className="st-home-motion-diagram-copy">▦&nbsp; {labels.customers}</text></g>)}
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
            {sourceColumnCount === 3 ? <CheckMark x="144" y="25" /> : null}
            {sinkColumnCount === 3 ? <CheckMark x="497" y="25" /> : null}
            <text x="260" y="151" textAnchor="middle" className={sinkColumnCount === 3 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-muted-copy'}>{sinkColumnCount === 3 ? labels.applied : labels.region}</text>
        </svg>
    );
}

function CheckpointDiagram({labels, time}) {
    const isComplete = time >= 2.7;
    const isRestoring = time >= 4.65 && time < 5.55;
    const isWriterLost = time >= 3.65 && time < 4.65;
    const signalProgress = time < 1.1 ? time / 0.9 : (time - 5.55) / 0.9;
    const showSignals = time < 1.1 || (time >= 5.55 && time < 7.4);

    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <path d="M122 70h70M327 70h70" className="st-home-motion-diagram-line" fill="none" /><Arrow x="192" y="70" /><Arrow x="397" y="70" />
            {[labels.source, labels.writer, labels.sink].map((label, index) => {
                const x = [16, 198, 403][index];
                const isLostWriter = index === 1 && isWriterLost;
                return <g key={label}><rect x={x} y="47" width="104" height="43" rx="10" className={isLostWriter ? 'st-home-motion-diagram-blue' : 'st-home-motion-diagram-node'} /><text x={x + 52} y="74" textAnchor="middle" className={isLostWriter ? 'st-home-motion-diagram-on-blue' : 'st-home-motion-diagram-strong'}>{isLostWriter ? labels.workerLost : label}</text></g>;
            })}
            <path d="M68 91C68 130 157 137 215 137M250 91v25" className="st-home-motion-diagram-line" fill="none" />
            <rect x="215" y="114" width="134" height="38" rx="9" className={isComplete ? 'st-home-motion-diagram-soft' : 'st-home-motion-diagram-node'} />
            <text x="282" y="135" textAnchor="middle" className="st-home-motion-diagram-copy">{isComplete ? `${labels.checkpoint} #42` : labels.checkpointState}</text>
            <text x="282" y="147" textAnchor="middle" className={isComplete ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-label'}>{isComplete ? labels.completed : labels.pending}</text>
            {showSignals ? <>
                {[0, 1].map((offset) => <React.Fragment key={offset}>
                    <MovingPacket path={[122, 70, 145, 70, 170, 70, 192, 70]} progress={signalProgress - offset * 0.48} tone="teal" />
                    <MovingPacket path={[327, 70, 350, 70, 375, 70, 397, 70]} progress={signalProgress - offset * 0.48 + 0.2} tone="teal" />
                </React.Fragment>)}
            </> : null}
            {time >= 1.1 && time < 2.7 ? (() => {
                const barrierX = 93 + (488 - 93) * ((time - 1.1) / 1.6);
                return <g><path d={`M${barrierX} 20V112`} className="st-home-motion-diagram-barrier" fill="none" /><rect x={barrierX - 29} y="4" width="58" height="18" rx="9" className="st-home-motion-diagram-soft" /><text x={barrierX} y="17" textAnchor="middle" className="st-home-motion-diagram-accent-text">{labels.barrier}</text></g>;
            })() : null}
            {isRestoring ? <MovingPacket path={[215, 137, 165, 137, 112, 121, 68, 91]} progress={(time - 4.65) / 0.9} /> : null}
            {isComplete ? <CheckMark x="338" y="129" /> : null}
        </svg>
    );
}

function renderMotionDiagram(labels, type, time) {
    const diagrams = {
        parallel: <ParallelReadsDiagram labels={labels} time={time} />,
        cdc: <SnapshotCdcDiagram labels={labels} time={time} />,
        transform: <TransformDiagram labels={labels} time={time} />,
        routing: <RoutingDiagram labels={labels} time={time} />,
        schema: <SchemaDiagram labels={labels} time={time} />,
        checkpoint: <CheckpointDiagram labels={labels} time={time} />,
    };

    return diagrams[type];
}

function MotionDiagram({labels, type, time}) {
    if (time < LOOP_TRANSITION_START_SECONDS) {
        return renderMotionDiagram(labels, type, time);
    }

    const blend = smooth((time - LOOP_TRANSITION_START_SECONDS) / (MOTION_CYCLE_SECONDS - LOOP_TRANSITION_START_SECONDS));
    return (
        <div className="st-home-motion-diagram-transition">
            <div className="st-home-motion-diagram-transition-frame" style={{opacity: 1 - blend}}>{renderMotionDiagram(labels, type, 7.49)}</div>
            <div className="st-home-motion-diagram-transition-frame" style={{opacity: blend}}>{renderMotionDiagram(labels, type, 0)}</div>
        </div>
    );
}

function getMotionStatus(labels, time, type) {
    let status = labels.status[type];
    let tone = 'blue';

    if (type === 'parallel') {
        const isComplete = PARALLEL_SPLITS.every((split) => time >= split.start + 2.5);
        status = isComplete ? labels.status.parallelComplete : labels.status.parallelRunning;
        tone = isComplete ? 'teal' : tone;
    } else if (type === 'cdc') {
        if (time < 2.8) {
            status = labels.status.cdcSnapshot;
        } else if (time < 4.1) {
            status = labels.status.cdcInsert;
        } else if (time < 5.55) {
            status = labels.status.cdcUpdate;
        } else if (time < 6.45) {
            status = labels.status.cdcDeleteStarted;
        } else {
            status = labels.status.cdcDeleteArrived;
            tone = 'teal';
        }
    } else if (type === 'routing' || type === 'schema' || type === 'transform') {
        status = labels.status[type];
        tone = type === 'schema' && time >= 3.8 ? 'teal' : tone;
    } else if (type === 'checkpoint') {
        if (time < 1.1) {
            status = labels.status.checkpointRunning;
        } else if (time < 2.7) {
            status = labels.status.checkpointBarrier;
        } else if (time < 3.65) {
            status = labels.status.checkpointComplete;
        } else if (time < 4.65) {
            status = labels.status.checkpointFailure;
        } else if (time < 5.55) {
            status = labels.status.checkpointRestore;
        } else {
            status = labels.status.checkpointResumed;
            tone = 'teal';
        }
    }

    return {status, tone};
}

function MotionStatus({labels, time, type}) {
    const renderStatus = (frameTime) => {
        const {status, tone} = getMotionStatus(labels, frameTime, type);
        return <p className={`st-home-motion-card-detail st-home-motion-card-detail-${tone}`}>{status}</p>;
    };

    if (time < LOOP_TRANSITION_START_SECONDS) {
        return renderStatus(time);
    }

    const blend = smooth((time - LOOP_TRANSITION_START_SECONDS) / (MOTION_CYCLE_SECONDS - LOOP_TRANSITION_START_SECONDS));
    return (
        <div className="st-home-motion-status-transition">
            <div style={{opacity: 1 - blend}}>{renderStatus(7.49)}</div>
            <div className="st-home-motion-status-transition-frame" style={{opacity: blend}}>{renderStatus(0)}</div>
        </div>
    );
}

export default function MotionMechanismGrid({caption, controls, gridLabel, labels = DEFAULT_DIAGRAM_LABELS, mechanisms}) {
    const [isMotionPaused, setIsMotionPaused] = React.useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();
    const {activeIndex, activeProgress, time} = useMotionClock(isMotionPaused);

    React.useEffect(() => {
        if (prefersReducedMotion) {
            setIsMotionPaused(true);
        }
    }, [prefersReducedMotion]);

    React.useEffect(() => {
        const onKeyDown = (event) => {
            if (event.code !== 'Space' || ['INPUT', 'SELECT', 'TEXTAREA'].includes(event.target.tagName)) {
                return;
            }

            event.preventDefault();
            setIsMotionPaused((paused) => !paused);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    return (
        <>
            <div className="st-home-motion-toolbar" role="group" aria-label={controls.label}>
                <button
                    type="button"
                    className="st-home-motion-control"
                    aria-pressed={isMotionPaused}
                    aria-keyshortcuts="Space"
                    onClick={() => setIsMotionPaused((paused) => !paused)}
                >
                    {isMotionPaused ? controls.play : controls.pause}
                </button>
            </div>
            <ul className="st-home-motion-grid" aria-label={gridLabel}>
                {mechanisms.map((mechanism, index) => (
                    <li
                        key={mechanism.title}
                        className={`st-home-motion-card st-home-motion-card-${mechanism.diagram}${index === activeIndex ? ' is-active' : ''}`}
                        style={index === activeIndex ? {'--motion-active-opacity': 0.48 + 0.42 * Math.sin(Math.PI * activeProgress), '--motion-active-progress': activeProgress} : undefined}
                    >
                        <article>
                            <div className="st-home-motion-card-heading">
                                <span>{String(index + 1).padStart(2, '0')}</span>
                                <div>
                                    <h3>{mechanism.title}</h3>
                                    <p>{mechanism.description}</p>
                                </div>
                            </div>
                            <div className="st-home-motion-visual"><MotionDiagram labels={labels} type={mechanism.diagram} time={time} /></div>
                            <MotionStatus labels={labels} time={time} type={mechanism.diagram} />
                            <p className="st-home-motion-card-note">{mechanism.note}</p>
                            {index === activeIndex ? <span className="st-home-motion-card-progress" aria-hidden="true" /> : null}
                        </article>
                    </li>
                ))}
            </ul>
            <p className="st-home-motion-caption">{caption}</p>
        </>
    );
}

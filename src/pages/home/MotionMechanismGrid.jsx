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

function Arrow({x, y}) {
    return <path d={`M${x - 6} ${y - 5}l6 5-6 5`} className="st-home-motion-diagram-arrow" fill="none" />;
}

function ParallelReadsDiagram() {
    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">SOURCE SPLITS</text>
            <text x="207" y="20" className="st-home-motion-diagram-label">READERS</text>
            <text x="438" y="20" className="st-home-motion-diagram-label">TARGET</text>
            <rect x="16" y="32" width="118" height="112" rx="10" className="st-home-motion-diagram-node" />
            {['S1', 'S2', 'S3', 'S4', 'S5', 'S6'].map((split, index) => {
                const x = 28 + (index % 2) * 49;
                const y = 45 + Math.floor(index / 2) * 31;
                const active = index === 1 || index === 3;
                return (
                    <g key={split}>
                        <rect x={x} y={y} width="39" height="22" rx="5" className={active ? 'st-home-motion-diagram-packet' : 'st-home-motion-diagram-chip'} />
                        <text
                            x={x + 19.5}
                            y={y + 15}
                            textAnchor="middle"
                            className={
                                active
                                    ? 'st-home-motion-diagram-on-blue'
                                    : 'st-home-motion-diagram-chip-text'
                            }
                        >
                            {split}
                        </text>
                    </g>
                );
            })}
            {[54, 87, 120].map((y, index) => (
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
        </svg>
    );
}

function SnapshotCdcDiagram() {
    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <text x="18" y="20" className="st-home-motion-diagram-label">MYSQL / ORDERS</text>
            <text x="373" y="20" className="st-home-motion-diagram-label">TARGET / ORDERS</text>
            <rect x="16" y="31" width="136" height="103" rx="9" className="st-home-motion-diagram-node" />
            <rect x="17" y="32" width="134" height="24" rx="7" className="st-home-motion-diagram-soft" />
            <text x="29" y="48" className="st-home-motion-diagram-label">id</text><text x="76" y="48" className="st-home-motion-diagram-label">status</text>
            <text x="29" y="77" className="st-home-motion-diagram-copy">41</text><text x="76" y="77" className="st-home-motion-diagram-copy">NEW</text>
            <text x="29" y="104" className="st-home-motion-diagram-copy">42</text><text x="76" y="104" className="st-home-motion-diagram-copy">NEW</text>
            <rect x="201" y="24" width="98" height="23" rx="12" className="st-home-motion-diagram-soft" />
            <text x="250" y="40" textAnchor="middle" className="st-home-motion-diagram-accent-text">SNAPSHOT</text>
            <path d="M153 82H367" className="st-home-motion-diagram-line" fill="none" />
            <Arrow x="367" y="82" />
            <rect x="235" y="70" width="48" height="23" rx="7" className="st-home-motion-diagram-teal" />
            <text x="259" y="86" textAnchor="middle" className="st-home-motion-diagram-on-teal">S:42</text>
            <text x="260" y="116" textAnchor="middle" className="st-home-motion-diagram-copy">SeaTunnel</text>
            <rect x="370" y="31" width="136" height="103" rx="9" className="st-home-motion-diagram-node" />
            <rect x="371" y="32" width="134" height="24" rx="7" className="st-home-motion-diagram-soft" />
            <text x="383" y="48" className="st-home-motion-diagram-label">id</text><text x="430" y="48" className="st-home-motion-diagram-label">status</text>
            <text x="383" y="77" className="st-home-motion-diagram-copy">41</text><text x="430" y="77" className="st-home-motion-diagram-copy">NEW</text>
        </svg>
    );
}

function TransformDiagram() {
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
            <rect x="365" y="64" width="24" height="24" rx="7" className="st-home-motion-diagram-teal" />
            <text x="377" y="81" textAnchor="middle" className="st-home-motion-diagram-on-teal">1</text>
            <text x="413" y="77" className="st-home-motion-diagram-muted-copy">waiting…</text>
            <text x="18" y="144" className="st-home-motion-diagram-code">CONCAT(name, '_')</text>
        </svg>
    );
}

function RoutingDiagram() {
    const rows = ['users', 'orders', 'items'];
    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            {rows.map((table, index) => {
                const y = 39 + index * 43;
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
                    </g>
                );
            })}
            <rect x="221" y="52" width="78" height="61" rx="12" className="st-home-motion-diagram-blue" />
            <text x="260" y="78" textAnchor="middle" className="st-home-motion-diagram-on-blue">Table</text>
            <text x="260" y="98" textAnchor="middle" className="st-home-motion-diagram-on-blue">route</text>
        </svg>
    );
}

function SchemaDiagram() {
    const rows = [['id', 'BIGINT'], ['name', 'VARCHAR'], ['region', 'VARCHAR']];
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
                        {index === 2 ? <rect x="22" y={y - 16} width="123" height="22" rx="4" className="st-home-motion-diagram-highlight" /> : null}
                        <text x="29" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-copy'}>{name}</text>
                        <text x="92" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-code'}>{type}</text>
                        <text x="382" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-copy'}>{name}</text>
                        <text x="445" y={y} className={index === 2 ? 'st-home-motion-diagram-teal-copy' : 'st-home-motion-diagram-code'}>{type}</text>
                    </g>
                );
            })}
            <path d="M152 82H364" className="st-home-motion-diagram-line" fill="none" /><Arrow x="364" y="82" />
            <rect x="225" y="48" width="58" height="22" rx="11" className="st-home-motion-diagram-soft" /><text x="254" y="64" textAnchor="middle" className="st-home-motion-diagram-accent-text">DDL</text>
            <rect x="217" y="74" width="42" height="23" rx="7" className="st-home-motion-diagram-blue" /><text x="238" y="90" textAnchor="middle" className="st-home-motion-diagram-on-blue">ADD</text>
        </svg>
    );
}

function CheckpointDiagram() {
    return (
        <svg viewBox="0 0 520 166" className="st-home-motion-diagram" aria-hidden="true">
            <path d="M122 70h70M327 70h70" className="st-home-motion-diagram-line" fill="none" /><Arrow x="192" y="70" /><Arrow x="397" y="70" />
            {['Source', 'Writer', 'Sink'].map((label, index) => {
                const x = [16, 198, 403][index];
                return <g key={label}><rect x={x} y="47" width="104" height="43" rx="10" className="st-home-motion-diagram-node" /><text x={x + 52} y="74" textAnchor="middle" className="st-home-motion-diagram-strong">{label}</text></g>;
            })}
            <rect x="232" y="20" width="70" height="21" rx="10" className="st-home-motion-diagram-soft" /><text x="267" y="35" textAnchor="middle" className="st-home-motion-diagram-accent-text">BARRIER</text>
            <path d="M68 91C68 130 157 137 215 137M250 91v25" className="st-home-motion-diagram-line" fill="none" />
            <rect x="215" y="114" width="134" height="38" rx="9" className="st-home-motion-diagram-node" />
            <text x="282" y="135" textAnchor="middle" className="st-home-motion-diagram-copy">Checkpoint state</text>
            <text x="282" y="147" textAnchor="middle" className="st-home-motion-diagram-label">COMPLETED</text>
        </svg>
    );
}

function MotionDiagram({type}) {
    const diagrams = {
        parallel: <ParallelReadsDiagram />,
        cdc: <SnapshotCdcDiagram />,
        transform: <TransformDiagram />,
        routing: <RoutingDiagram />,
        schema: <SchemaDiagram />,
        checkpoint: <CheckpointDiagram />,
    };

    return diagrams[type];
}

export default function MotionMechanismGrid({caption, gridLabel, mechanisms}) {
    return (
        <>
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
                            <div className="st-home-motion-visual"><MotionDiagram type={mechanism.diagram} /></div>
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

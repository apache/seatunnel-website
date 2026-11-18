---
sidebar_position: 2
---

# Architecture

## Overview

SeaTunnel is a distributed data integration tool with a pluggable architecture. It decouples the connector layer from the execution engine, allowing the same connectors to run on different engines.

```mermaid
flowchart LR
    config["Job<br/>Configuration"]
    core["SeaTunnel Core<br/>Parser / Coordinator / Scheduler"]
    engine["Execution Engine<br/>Zeta / Flink / Spark"]

    subgraph pipeline["Connector Pipeline"]
        direction LR
        source["Source<br/>Connectors"] --> transform["Transform<br/>(Optional)"] --> sink["Sink<br/>Connectors"]
    end

    config --> core --> engine --> source

    classDef controlNode fill:#0f1d33,stroke:#5db8e2,stroke-width:2px,color:#f8fbff;
    classDef coreNode fill:#10223a,stroke:#5db8e2,stroke-width:2px,color:#f8fbff;
    classDef connectorNode fill:#0c2530,stroke:#2dd4bf,stroke-width:2px,color:#f8fbff;
    classDef engineNode fill:#1f1a34,stroke:#8d7cf6,stroke-width:2px,color:#f8fbff;

    class config controlNode;
    class core coreNode;
    class engine engineNode;
    class source,transform,sink connectorNode;
    style pipeline fill:#081425,stroke:#5db8e2,stroke-width:1.5px,color:#f8fbff;
    linkStyle default stroke:#8ab4f8,stroke-width:2px;
```

## Core Components

### 1. Connector API

Engine-independent API for developing Source, Transform, and Sink connectors.

| Component | Description |
|-----------|-------------|
| **Source** | Reads data from external systems (databases, files, message queues) |
| **Transform** | Performs data transformations (field mapping, filtering, type conversion) |
| **Sink** | Writes data to target systems |

### 2. Execution Engines

| Engine | Best For |
|--------|----------|
| **SeaTunnel Engine (Zeta)** | Data synchronization, CDC, low resource usage |
| **Apache Flink** | Complex stream processing, existing Flink infrastructure |
| **Apache Spark** | Large-scale batch processing, existing Spark infrastructure |

### 3. Translation Layer

Translates SeaTunnel's unified API to engine-specific implementations, enabling connector reuse across engines.

## Data Flow

```mermaid
flowchart LR
    source[Source] --> split[Split] --> reader[Reader] --> transform[Transform] --> writer[Writer] --> sink[Sink]
    reader -. snapshot .-> state["Checkpoint / State"]
    writer -. snapshot .-> state
    state --> tolerance["Fault Tolerance"]

    classDef data fill:#0c2530,stroke:#2dd4bf,stroke-width:2px,color:#f8fbff;
    classDef runtime fill:#10223a,stroke:#5db8e2,stroke-width:2px,color:#f8fbff;
    classDef guard fill:#1f1a34,stroke:#8d7cf6,stroke-width:2px,color:#f8fbff;

    class source,split,sink data;
    class reader,transform,writer runtime;
    class state,tolerance guard;
    linkStyle default stroke:#8ab4f8,stroke-width:2px;
```

**Key Features:**
- Parallel reading with split-based distribution
- Exactly-once semantics via distributed snapshots
- Automatic failover and recovery

## Module Structure

| Module | Responsibility |
|--------|----------------|
| `seatunnel-api` | Core API definitions |
| `seatunnel-connectors-v2` | Source and Sink connectors |
| `seatunnel-transforms-v2` | Transform plugins |
| `seatunnel-engine` | SeaTunnel Engine (Zeta) |
| `seatunnel-translation` | Engine adapters for Flink and Spark |
| `seatunnel-core` | Job submission and CLI |
| `seatunnel-formats` | Data format handlers |
| `seatunnel-e2e` | End-to-end tests |

## Job Execution Flow

1. **Parse** - Read and validate job configuration
2. **Plan** - Generate execution plan with parallelism
3. **Schedule** - Distribute tasks to workers
4. **Execute** - Run Source → Transform → Sink pipeline
5. **Monitor** - Track progress, metrics, and checkpoints

## Next Steps

- [Engine Comparison](../engines/overview.md)
- [Quick Start](../getting-started/locally/quick-start-seatunnel-engine.md)
- [Connector List](../connectors/overview.md)

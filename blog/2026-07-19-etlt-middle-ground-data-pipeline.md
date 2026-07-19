---
slug: etlt-middle-ground-data-pipeline
title: "EtLT: The Middle Ground Your Data Pipeline Has Been Missing"
tags: [SeaTunnel, Architecture, "Data Integration", EtLT, CDC, dbt]
authors:
  - name: David Zollo
    title: Apache SeaTunnel Contributor
    url: https://github.com/davidzollo
    image_url: https://github.com/davidzollo.png
---

# EtLT: The Middle Ground Your Data Pipeline Has Been Missing

Ask a data engineer whether their pipeline is ETL or ELT and you'll get an instant answer. Old-school engineers say ETL. dbt users say ELT.

Both answers are incomplete. There's a third pattern that more accurately describes what modern data pipelines actually do — and it's been hiding in plain sight: **EtLT**.

---

## The Three Paradigms

### ETL: Transform Before You Land

Raw data is extracted, passed through a dedicated transformation tier (Spark, DataStage, Informatica), and only then written to the destination warehouse.

```
Source ──► [Transform tier] ──► Destination
```

**Pros:** The warehouse always holds clean, business-ready data. Compliance controls are enforced before data ever lands.  
**Cons:** The transform tier becomes a bottleneck. Schema changes require coordinated updates across multiple layers. Running a dedicated compute cluster for transforms is expensive.

### ELT: Land First, Transform In-Place

Popularized by dbt. Raw data lands directly in the warehouse (BigQuery, Snowflake, ClickHouse), and SQL does the transformations in place. The transform "tier" is just the warehouse itself.

```
Source ──► Destination (raw layer) ──► [SQL inside warehouse] ──► Business layer
```

**Pros:** Raw data is preserved for auditing. You reuse warehouse compute. Iteration is fast.  
**Cons:** Sensitive fields — SSNs, email addresses, phone numbers — land in plaintext. There's no second chance to mask them once they're in the warehouse. Data quality issues only surface after Load, at which point downstream models may already be contaminated.

### EtLT: A Lightweight Transform In-Transit

```
Source ──► [tiny t] ──► Destination (sanitized raw layer) ──► [T inside warehouse]
```

The **tiny t** is a small set of row-level transformations that happen while data is in flight:

| tiny t operation | Purpose |
|---|---|
| Field projection / column pruning | Drop unused columns before transfer — save bandwidth |
| PII masking | Phone numbers, SSNs, emails are anonymized before landing — compliance enforced at the pipeline layer, not as an afterthought |
| Type normalization | Source `VARCHAR "2023-01-01"` becomes `DATE` on arrival — no type-casting SQL needed in the warehouse |
| Row filtering | Unwanted events can be discarded pre-Load; stateful CDC transitions require changelog-aware handling |
| Field renaming | Align to destination naming conventions without an alias layer |
| NULL backfill | Reduce `COALESCE` calls in downstream aggregation SQL |

The **big T** (post-Load Transform) is where actual business logic lives: multi-table JOINs, metric calculations, aggregations, ML feature engineering.

---

## Why Engineers Keep Overlooking EtLT

The reason is tooling — not concept.

Legacy ETL tools (Informatica, DataStage) made transformations expensive and complex. Engineers overcorrected by pushing all logic into the pipeline, which made pipelines brittle. 

Modern ELT tools (Airbyte, Fivetran) swung to the opposite extreme: move data from source to destination with almost no in-transit processing, then let dbt handle everything.

**The gap neither camp fills:** when you need both in-transit operations (masking, filtering) *and* complex analytical SQL in the destination, you end up with awkward workarounds in both tool families.

EtLT fills exactly that gap.

---

## SeaTunnel Is Built for EtLT

Apache SeaTunnel describes itself in its official documentation as an **"EL(T) data integration platform"** — the parentheses around T are intentional. The Transform step is lightweight and optional. This is not a marketing choice; it's an architectural constraint.

### The Three-Layer Model Maps Directly to EtLT

SeaTunnel's execution model has three stages: **Source → Transform → Sink**.

```
Source (E)
  └──► Transform (tiny t)  ← optional, lightweight processing
        └──► Sink (L)
              └──► [Warehouse SQL / dbt] (T)  ← big T lives here
```

SeaTunnel draws a clear line around what Transform can do. The official docs state:

> "Transform can only be used for some simple transformations of data, such as converting a column to uppercase/lowercase, modifying column names, or splitting one column into multiple columns."

This describes the intended scope of the built-in transforms. In the current Zeta SQL Transform, JOIN and GROUP BY are not supported, so cross-table joins and aggregations belong in the destination system or another dedicated processing layer.

### Built-in Transforms Cover the Typical tiny t Operations

| SeaTunnel Transform | tiny t operation |
|---|---|
| `FieldMapper` | Column renaming, field projection |
| `Filter` | Column projection with include/exclude lists |
| `Replace` | Field value substitution (masking/redaction) |
| `Split` | Split one column into multiple (e.g., address parsing) |
| `SQL Transform` | Row filtering and lightweight SQL expressions; current Zeta implementation does not support JOIN or GROUP BY |
| `Copy` | Field duplication |

SeaTunnel provides both map and flat-map transform interfaces. Its current built-in transforms focus on processing individual records and schemas rather than cross-row aggregation, which makes them a practical fit for the tiny t layer.

### Where EtLT Matters Most: CDC Pipelines

Real-time CDC sync is one of SeaTunnel's core use cases — and it's also where pure ELT breaks down for compliance.

Here's the fundamental problem: **once a value from a binlog event lands in your warehouse, there is no second chance to mask it.** A phone number or SSN written to a ClickHouse table can't be un-written by a downstream dbt model. The original plaintext is already persisted.

EtLT solves what ELT cannot: it applies compliance transformations inside the only window that exists before the data reaches its destination.

A minimal configuration shape for a SeaTunnel CDC job with tiny t transforms is shown below. Replace the example credentials and endpoints before running it:

```hocon
env {
  job.mode = "STREAMING"
}

source {
  MySQL-CDC {
    plugin_output = "raw_user_info"
    url = "jdbc:mysql://localhost:3306/orders"
    username = "seatunnel"
    password = "change-me"
    server-id = 5601-5604
    table-names = ["orders.user_info"]
  }
}

transform {
  # Mask phone numbers in-transit — the raw value never reaches the warehouse
  Replace {
    plugin_input = "raw_user_info"
    plugin_output = "masked_user_info"
    replace_field = "phone"
    pattern = "(\\d{3})\\d{4}(\\d{4})"
    replacement = "$1****$2"
    is_regex = true
  }
}

sink {
  # L: land into the ClickHouse raw layer
  Clickhouse {
    plugin_input = "masked_user_info"
    host = "clickhouse-host:8123"
    database = "raw"
    table = "user_info"
    username = "default"
    password = "change-me"
    primary_key = "id"
    support_upsert = true
    allow_experimental_lightweight_delete = true
  }
}
```

Once the data is in ClickHouse, you build wide tables, compute retention metrics, and run analytical queries — that's the big T. dbt models are a natural fit here.

---

## SeaTunnel + dbt: Full-Stack EtLT

dbt owns the big T after Load. SeaTunnel owns everything from source to Load (including tiny t). They're complementary, not competing.

```
Source
  └── SeaTunnel (E + tiny t + L)
        └── dbt (T)
              └── BI / ML
```

SeaTunnel handles data arrival and in-transit hygiene. dbt handles data modeling and business logic. Each tool does what it's good at and nothing more.

---

## The Trap: Trying to Push Big T Into SeaTunnel

Because SeaTunnel supports `SQL Transform`, engineers sometimes try writing `GROUP BY` aggregations there. The current Zeta SQL Transform explicitly rejects GROUP BY and JOIN queries.

If you need pre-Load aggregation, you have two real options:

1. **Do it in the destination system** — this is the whole point of EtLT and ELT.
2. **Use a dedicated processing job outside the SeaTunnel transform chain** — at that point you are building a full streaming ETL pipeline rather than keeping the transformation in the tiny t layer.

Clear boundaries make failures easier to trace. When tiny t and big T are collapsed into the same layer, it becomes nearly impossible to reason about where something went wrong.

---

## Summary

| Pattern | Best fit | SeaTunnel's role |
|---|---|---|
| ETL | Strong compliance requirements, dedicated transform compute cluster | Handles E and L plus supported lightweight transforms; complex T requires a dedicated processing layer |
| ELT | Destination is a powerful SQL engine (BigQuery/Snowflake), no strict in-transit compliance requirements | Pure E + L — disable Transform |
| **EtLT** | **Real-time CDC, in-transit PII masking, destination has dbt/SQL capability** | **Natural fit: E + tiny t + L; big T belongs in the destination** |

SeaTunnel is a natural fit for EtLT — not because it claims the label, but because its Source/Transform/Sink separation, current built-in transform scope, and explicit "EL(T)" positioning all point to the same shape: move data fast, sanitize lightly in-flight, and leave the heavy lifting to the destination.

---

## Further Reading

- [Apache SeaTunnel — About](https://seatunnel.apache.org/docs/2.3.13/introduction/about/#seatunnel-work-flowchart) — official EL(T) positioning (see the "SeaTunnel Work Flowchart" section)
- [SeaTunnel Transform Connectors](https://seatunnel.apache.org/docs/transforms/) — full list of built-in lightweight transforms
- [dbt](https://www.getdbt.com/) — the natural partner for the big T in EtLT
- [SeaTunnel API Deep Dive](https://seatunnel.apache.org/blog/2026/01/06/seatunnel-api-deep-dive) — deep dive into the single-row `map` contract

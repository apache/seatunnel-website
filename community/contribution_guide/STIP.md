# SeaTunnel Improvement Proposal (STIP)

## What is a STIP?

A **SeaTunnel Improvement Proposal (STIP)** is the standard process for proposing significant
new features, architectural changes, or major improvements to Apache SeaTunnel. A STIP is
tracked as a GitHub Issue with the `design` label and a sequential number prefix in its title
(e.g., `[STIP-23] ...`).

STIPs serve as the single source of truth for *why* a feature is being built, *how* it should
be designed, and *what* the expected outcomes are. They give the community visibility into
planned work, preserve a permanent record of design decisions, and help new contributors
understand the direction of the project.

## When Should I Create a STIP?

Create a STIP when your proposal involves one or more of the following:

- A new core feature or significant change to existing behavior
- A change to the SeaTunnel API or Connector SPI
- A new engine integration or major engine-level change
- An architectural decision that affects multiple modules
- A change that requires community consensus before implementation begins

You do **not** need a STIP for:

- Bug fixes
- Documentation updates
- Minor improvements or refactoring
- Adding a new connector (unless it requires changes to the API or SPI)

## STIP Lifecycle

Each STIP goes through the following states:

| State            | Meaning                                                                                      |
|------------------|----------------------------------------------------------------------------------------------|
| **Draft**        | The proposal is being written; not yet ready for community discussion.                       |
| **Under Review** | The issue has been opened and is being discussed by the community on GitHub and/or the mailing list. |
| **Accepted**     | The community has reached consensus and implementation may proceed.                          |
| **Rejected**     | The community decided not to move forward with the proposal. The issue is closed with a clear explanation. |
| **Implemented**  | The feature has been merged and the corresponding issue is closed.                           |

A STIP author should update the issue with the current state as it progresses.

## STIP Numbering

STIPs are numbered sequentially in the order they are created. To find the current highest
number and determine the next one, browse the full list:

> https://github.com/apache/seatunnel/issues?q=is%3Aissue+label%3Adesign+sort%3Acreated-asc

Here are a few representative examples for reference:

| Number  | Title                                                              | Issue                                                                 | Status      |
|---------|--------------------------------------------------------------------|-----------------------------------------------------------------------|-------------|
| STIP-1  | Decoupling connectors from compute engines                         | [#1608](https://github.com/apache/seatunnel/issues/1608)             | Implemented |
| STIP-5  | ST-Engine Design And Task Tracking                                 | [#2272](https://github.com/apache/seatunnel/issues/2272)             | Implemented |
| STIP-12 | CDC Connector Design                                               | [#3175](https://github.com/apache/seatunnel/issues/3175)             | Implemented |
| STIP-15 | Design of Dirty Data Collection                                    | [#4587](https://github.com/apache/seatunnel/issues/4587)             | Accepted    |
| STIP-21 | Support Traffic Dyeing (Sampling) and Context-Aware Metrics        | [#10305](https://github.com/apache/seatunnel/issues/10305)           | Under Review|

The next new proposal should be numbered **STIP-23**.

## How to Submit a STIP

### Step 1 — Gauge interest on the mailing list

Before opening a formal STIP, consider sending a short email to
`dev@seatunnel.apache.org` describing the problem and your high-level approach.
Early feedback helps you avoid investing time in a direction the community will
not accept, and may reveal related efforts you were unaware of.

### Step 2 — Find the next available number

Browse the [full STIP list](https://github.com/apache/seatunnel/issues?q=is%3Aissue+label%3Adesign+sort%3Acreated-asc)
to confirm the highest existing number and increment by one.

### Step 3 — Open a GitHub Issue

Go to [apache/seatunnel Issues](https://github.com/apache/seatunnel/issues/new/choose)
and create a new issue with:

- **Title:** `[STIP-N] [Module] Brief description`
  (e.g., `[STIP-23] [Connector] Support multi-catalog source`)

Write the issue body following the [STIP Content Template](#stip-content-template) below.

### Step 4 — Drive the discussion to consensus

Respond promptly to comments, update the proposal as the design evolves, and
work toward one of the terminal states: **Accepted** or **Rejected**.
Large or controversial proposals should be explicitly discussed on
`dev@seatunnel.apache.org` before being marked Accepted.

### Step 5 — Link PRs back to the STIP

When submitting implementation pull requests, reference the STIP issue number
in the PR description (e.g., `Closes #NNNN` or `Part of STIP-N`).

## STIP Content Template

Use the following structure when writing the body of your STIP GitHub Issue.
Delete sections that are genuinely not applicable; do not leave them empty.

```markdown
## Background

<!-- Describe the problem or opportunity this proposal addresses. Include
     enough context for a reader unfamiliar with the area to understand why
     this matters. -->

## Motivation

<!-- Explain why the current state is insufficient and why solving this
     problem is valuable to the project. -->

## Goals

<!-- List the concrete outcomes this proposal aims to achieve. Use bullet
     points, each starting with a verb:
       - Support reading nested schemas from Kafka in the Kafka source.
       - ...                                                          -->

## Non-Goals

<!-- Explicitly state what is out of scope for this proposal to prevent
     scope creep during review. -->

## Design

<!-- Describe the proposed solution in enough detail that an experienced
     contributor could implement it. Include:
       - Key interfaces / APIs / configuration options being added or changed
       - Data flow or sequence diagrams where helpful
       - How the change interacts with existing components             -->

## Compatibility, Deprecation, and Migration Plan

<!-- Describe any backward-incompatible changes and how existing users
     should migrate. If fully backward-compatible, state that explicitly. -->

## Test Plan

<!-- Describe how the change will be tested: unit tests, integration tests,
     performance benchmarks, etc. -->

## Alternatives Considered

<!-- Describe other approaches you evaluated and explain why you chose the
     proposed design over them. -->

## References

<!-- Links to related issues, PRs, papers, or prior art. -->
```


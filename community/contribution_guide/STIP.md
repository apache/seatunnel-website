# SeaTunnel Improvement Proposal (STIP)

## What is a STIP?

A **SeaTunnel Improvement Proposal (STIP)** is the standard process for
proposing significant new features, architectural changes, or major improvements
to Apache SeaTunnel. A STIP is tracked as a GitHub Issue with the `design` label
and a sequential number prefix in its title (e.g., `[STIP-23] ...`).

STIPs serve as the single source of truth for *why* a feature is being built,
*how* it should be designed, and *what* the expected outcomes are. They give the
community visibility into planned work, preserve a permanent record of design
decisions, and help new contributors understand the direction of the project.

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

## STIP Numbering

STIPs are numbered sequentially in the order they are created. To find the
current highest number and determine the next one, check the full list:
> https://github.com/apache/seatunnel/issues?q=is%3Aissue+label%3Adesign+sort%3Acreated-asc

Here are a few typical examples of STIPs for reference:

| Number  | Title                                                              | Issue                                                                 | Status |
|---------|--------------------------------------------------------------------|-----------------------------------------------------------------------|--------|
| STIP-1  | Decoupling connectors from compute engines                         | [#1608](https://github.com/apache/seatunnel/issues/1608)             | Closed |
| STIP-5  | ST-Engine Design And Task Tracking                                 | [#2272](https://github.com/apache/seatunnel/issues/2272)             | Closed |
| STIP-12 | CDC Connector Design                                               | [#3175](https://github.com/apache/seatunnel/issues/3175)             | Closed |
| STIP-15 | Design of Dirty Data Collection                                    | [#4587](https://github.com/apache/seatunnel/issues/4587)             | Open   |
| STIP-21 | Support Traffic Dyeing (Sampling) and Context-Aware Metrics        | [#10305](https://github.com/apache/seatunnel/issues/10305)           | Open   |

The next new proposal should follow sequentially, e.g., **STIP-23**.

## How to Submit a STIP

### Step 1 — Check the next available number

Browse the [full STIP list](https://github.com/apache/seatunnel/issues?q=is%3Aissue%20sort%3Acreated-desc%20STIP)
to confirm the highest existing number and increment by one.

### Step 2 — Open a GitHub Issue

Go to [apache/seatunnel Issues](https://github.com/apache/seatunnel/issues/new/choose)
and create a new issue with:

- **Title:** `[STIP-N] [Module] Brief description`
  (e.g., `[STIP-23] [Connector] Support multi-catalog source`)
- **Label:** `design`

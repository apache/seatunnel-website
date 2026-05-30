---
sidebar_position: 4
---

# SeaTunnel Engine(Zeta) Version Upgrade

This chapter describes how to upgrade an existing SeaTunnel Engine installation in a controlled way. If you are setting up a brand-new environment, see [SeaTunnel Engine(Zeta) Deployment](deployment.md) first.

## Before You Start

Before upgrading, confirm these basic items:

1. Read [Incompatible Changes](../../introduction/concepts/incompatible-changes.md) and check whether the target version introduces any breaking behavior that affects your jobs, monitoring, or integration scripts.
2. Record the current deployment mode, cluster name, port settings, connector list, JDBC drivers, and customized startup parameters.
3. Back up `config/`, `connectors/`, `plugins/`, custom scripts, and deployment manifests before replacing any package or image.
4. Prepare the target version in a separate directory, image tag, or release package. Avoid overwriting a running installation in place.

## Step 1: Protect Running Jobs

If the environment contains stateful or long-running jobs, protect their runtime state before upgrading.

- For jobs that depend on checkpoint or savepoint recovery, create a savepoint or pause point before stopping the old version.
- For jobs that can be safely rerun from the source, still record the job configuration and current status before you stop them.

See [Client Command Line Tool](user-command.md) for the `--savepoint` and `--restore` workflow.

## Step 2: Replace the Package and Dependencies

After the running state is protected, upgrade the SeaTunnel package or container image on every related node.

- Keep required connector JARs and JDBC drivers aligned with the target version.
- Re-check customized JVM options, log settings, cluster settings, and startup scripts before restart.
- If the upgrade also changes the deployment topology, re-validate the target architecture with [SeaTunnel Engine(Zeta) Deployment](deployment.md).

## Step 3: Restart and Validate

After the new version is installed, perform validation before restoring normal traffic.

1. Start the upgraded local service or cluster nodes.
2. Submit a small smoke-test job first.
3. Check job submission, job listing, logs, and monitoring information.
4. Restore or resume critical jobs only after the smoke test passes.

## Step 4: Roll Back if Validation Fails

If the upgraded environment does not pass validation:

1. Stop or isolate the new version first.
2. Restore the previous package, configuration backup, and required dependencies.
3. Resume or resubmit critical jobs with the previous known-good environment.

## Related Documents

- [SeaTunnel Engine(Zeta) Deployment](deployment.md)
- [Client Command Line Tool](user-command.md)
- [Incompatible Changes](../../introduction/concepts/incompatible-changes.md)

# Rythra Beta Production-Maturity Gate

Rythra is currently **beta**. This document defines the engineering gates required before calling a release production-ready.

## Runtime safety

- [ ] Node disconnects recover without orphaning players.
- [ ] Session resume is exercised after process/network failures.
- [ ] Node migration preserves playback state where the protocol permits it.
- [ ] Shutdown drains resources and closes transports cleanly.
- [ ] Unexpected Lavalink events are handled without crashing the runtime.

## API stability

- [ ] Public exports are documented with JSDoc.
- [ ] Protocol versions are isolated behind versioned adapters.
- [ ] Breaking changes are explicitly documented.
- [ ] Deprecated APIs have a migration path.

## Quality gates

- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Unit tests pass.
- [ ] Package boundary checks pass.
- [ ] Package version checks pass.
- [ ] Build succeeds for every publishable package.

## Operational readiness

- [ ] Metrics can expose node/player health.
- [ ] Applications can provide a persistence adapter when durable recovery is required.
- [ ] Errors expose actionable codes/messages.
- [ ] Logs avoid credentials and sensitive payloads.
- [ ] Compatibility with supported Lavalink protocol versions is tested in CI.

## Release policy

A beta release may ship while one or more production gates remain incomplete. It must not be described as production-ready until the relevant gates above are verified.

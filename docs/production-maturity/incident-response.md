# Beta incident response

Rythra is beta. When a production-like deployment encounters a serious runtime failure, capture enough information to reproduce it without exposing credentials or user data.

## Severity

- **P0:** widespread playback/runtime outage or data loss.
- **P1:** major feature unavailable or repeated node/session recovery failures.
- **P2:** isolated failure with a documented workaround.
- **P3:** cosmetic, documentation, or low-impact developer-experience issue.

## Required report

Include the Rythra version, package versions, Node/Bun version, Lavalink version, protocol adapter, connector, reproducible configuration, relevant error code, and timeline. Redact tokens, credentials, private URLs, and user content.

## Recovery order

1. Protect the application from cascading retries.
2. Preserve actionable logs and metrics.
3. Verify node health and session state.
4. Recover or migrate affected players when supported.
5. Reduce traffic or disable the failing integration if necessary.
6. Reproduce in an isolated environment.
7. Ship a regression test before closing the incident.

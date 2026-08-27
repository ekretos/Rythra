# Runtime compatibility

Rythra is designed to be usable from both Bun and Node.js applications.

## Supported runtimes

| Runtime | Status | CI |
| --- | --- | --- |
| Bun | 🟢 Supported | Required |
| Node.js 22 | 🟢 Supported | Required |

## Integration policy

- Avoid runtime-specific APIs in the public core unless there is a documented adapter.
- Keep Node.js-only APIs behind explicit adapters.
- Run the compatibility workflow for every pull request.
- Test package entry points from both runtimes before a release.

## Ecosystem policy

Rythra integrations should live outside the core playback engine. Connectors, persistence adapters, metrics exporters, source/plugin integrations, and framework helpers should be independently publishable packages.

Recommended package naming:

- `@rythra/core`
- `@rythra/connectors`
- `@rythra/protocol`
- `@rythra/persistence`
- `@rythra/metrics`
- `@rythra/plugins`
- `@rythra/types`

This keeps the core dependency graph small while allowing the ecosystem to grow independently.

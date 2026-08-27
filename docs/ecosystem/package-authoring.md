# Community package authoring

Rythra treats integrations as products, not examples. A community package should be independently understandable, installable, testable, and maintainable.

## Package contract

A package should expose a small public entry point and avoid private Rythra imports.

```text
package/
├── src/
│   └── index.ts
├── test/
├── README.md
├── CHANGELOG.md
└── package.json
```

## Integration categories

| Category | Purpose |
| --- | --- |
| Connector | Connect a Discord framework to Rythra |
| Provider | Resolve/search audio sources |
| Plugin | Extend runtime behavior |
| Persistence | Store recoverable application state |
| Metrics | Export runtime telemetry |

## Compatibility metadata

Every published integration should state:

- supported Rythra versions
- supported Lavalink protocol versions
- supported Node and Bun versions
- supported framework versions when applicable
- whether the integration is beta or stable

## Public API quality

Use JSDoc on exported types, classes, functions, options, and lifecycle hooks. Prefer stable interfaces over exposing internal manager classes. Do not make consumers depend on implementation paths under another package's `src/` directory.

## Tests

Tests should exercise the public API and include failure behavior relevant to the integration. A connector should test disconnect/reconnect handling; a provider should test unavailable sources; persistence should test missing/corrupt state; plugins should test lifecycle cleanup.

## Release discipline

Use SemVer and a changelog. Breaking compatibility changes require a documented migration path. Keep the package independently releasable from unrelated Rythra packages.

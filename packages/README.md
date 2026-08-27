# Rythra Packages

Rythra is organized as a package-oriented monorepo. Production runtime code belongs under `packages/`; tests and runnable examples remain outside the package tree.

## Layout

```text
packages/
├── core/          # Framework-agnostic Lavalink runtime
├── connectors/    # Discord library adapters
├── protocol/      # Lavalink protocol implementations
├── persistence/   # Persistence adapters
├── metrics/       # Metrics and observability
├── plugins/       # Plugin contracts and runtime
└── types/         # Shared public types

test/              # Unit/integration tests
example/           # Runnable examples
```

The existing `src/` entrypoint remains the compatibility surface during migration. New production code should target the package boundaries above.

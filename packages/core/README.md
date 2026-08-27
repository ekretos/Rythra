# @rythra/core

Framework-agnostic Lavalink runtime.

```text
core/
├── client/       manager lifecycle and public API
├── node/         node health, selection, migration and recovery
├── player/       playback state and transport
├── queue/        queue contracts and stores
├── filters/      typed Lavalink filters
├── recovery/     resume and failover orchestration
├── validation/   runtime/configuration validation
└── errors/       stable typed errors
```

## Design rules

- No Discord-library dependency.
- Protocol details stay behind adapters.
- Queue storage is replaceable.
- Recovery is explicit and observable.
- Public APIs retain comprehensive JSDoc.

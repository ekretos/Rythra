# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

## [0.3.0]

### Added
- Lunibee connector.
- `@rythra/types` now holds all public contracts; `@rythra/metrics` (Prometheus/StatsD exporters) and `@rythra/persistence` (memory and file adapters) are now populated.
- `Queue.pushHistory` and `Queue.maxHistory` (default 100) bound the played-track history.
- `Node.createTransport` hook so transports can be replaced in tests.
- Connector contract tests covering all five connectors; node lifecycle regression tests.
- `CONTRIBUTING.md`, `LICENSE`, `docs/MIGRATION.md` and this changelog.

### Changed
- **Breaking:** merged `@rythra/connector-discordjs`, `-eris`, `-oceanic` and `-seyfert` into `@rythra/connectors` (subpaths `/discordjs`, `/eris`, `/oceanic`, `/seyfert`, `/lunibee`). See the migration guide.
- **Breaking:** a Lavalink node password is now required; the built-in `youshallnotpass` default was removed.
- Node, Player and Rest no longer import each other (shared `contracts.ts`); no circular imports remain.
- Removed ESLint; `bun run typecheck` (strict, with `noUnusedLocals`/`noUnusedParameters`) is the static check. Upgraded TypeScript to 7.0.2 (TypeDoc, which does not support TS 7 yet, runs from an isolated `scripts/typedoc` toolchain pinned to TypeScript 6.0.3) and all dependencies (docs: Astro 7, Starlight 0.42).

### Added (continued)
- Opt-in `failover` option (with `failoverDelay`, default 5000 ms, so brief outages do not trigger it): when a node stays disconnected, `Rythra` moves its players to another ready node (`migratePlayers`, `RythraPlayer.moveTo`) and emits `playerMigrate` / `playerMigrateFailed`.
- `bun run check:dist` loads every built entry point under plain Node ESM and compiles a consumer project against the built declarations.
- `docs/TROUBLESHOOTING.md`.

### Fixed
- `FilePersistenceAdapter` no longer fails permanently on a corrupt JSON file (it is kept as `<file>.corrupt` and the store starts empty) and uses a unique temp file per write.
- A `connect()` call waiting on an in-flight attempt now rejects when `disconnect()` is called instead of hanging.
- `PrometheusMetricsAdapter` appends `_total` to counter names; a test keeps the default client version in sync with the package version.
- `publish:all` used `npm publish`, which leaves `workspace:` dependency ranges unresolved, and published `@rythra/core` before `@rythra/types`; it now uses `bun publish` in dependency order.
- Published packages could not be imported by Node ESM (relative imports lacked `.js` extensions, which only Bun and bundlers tolerate); `@rythra/core` also used `ws` without declaring it as a dependency.
- Late events from a replaced/closed socket could null the current transport and trigger bogus reconnects; they are now ignored.
- A failed connect left the node stuck in `connecting` and emitted an unhandled `error` (throwing) when no listener was attached.
- Disconnecting during a pending connect resolved `connect()` as successful.
- Nodes retried forever after the server rejected credentials (HTTP 401/403); they now stop and emit `reconnectFailed`.
- `reconnectFailed` could be emitted twice.
- An autoplay failure after a track ended caused an unhandled rejection; it is now emitted as `playerError`.
- `Rythra.destroy()` left its timeout timer running, keeping the process alive for up to `timeout` ms after a clean shutdown.
- `destroyPlayer` leaked the player (and its listeners) when stopping it failed.
- REST: timeouts and network failures now carry request context and `cause`; a successful response with malformed JSON now throws instead of silently resolving `undefined`.
- Plugins: concurrent registration of one name could run `setup` twice; setup/teardown failures are wrapped with the plugin name; `clear()` now tears down every plugin and reports failures as an `AggregateError`.
- Connectors: calling `listen()` twice no longer registers duplicate gateway listeners.
- `Queue.add` could overflow the stack for very large arrays; played-track history grew without bound.

## [0.2.0]

- Initial modular release: `@rythra/core`, `protocol`, `plugins` and per-library connectors.

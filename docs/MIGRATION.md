# Migrating from 0.2.0 to 0.3.0

## Connectors are one package

```diff
- import { DiscordJS } from '@rythra/connector-discordjs';
+ import { DiscordJS } from '@rythra/connectors';
```

Subpaths are available (`@rythra/connectors/eris`, `/oceanic`, `/seyfert`, `/lunibee`, `/discordjs`). Uninstall the old `@rythra/connector-*` packages. The Discord library itself stays your own dependency.

## Node password is required

The implicit `youshallnotpass` fallback was removed. Pass `password` explicitly (for example `process.env.LAVALINK_PASSWORD`); `Node` throws a `ConfigurationError` otherwise.

## Behavior changes

- After the server rejects credentials (HTTP 401/403) a node stops reconnecting and emits `reconnectFailed`.
- `connect()` rejects if `disconnect()` is called while it is pending.
- `queue.previous` keeps at most `Queue.maxHistory` (100) tracks.
- REST responses with a 2xx status and invalid JSON now throw `Malformed JSON in Lavalink response`.
- `PluginRegistry.clear()` rejects with an `AggregateError` if any plugin teardown fails (all plugins are still removed).
- An autoplay failure is emitted as `playerError` on the player instead of an unhandled rejection.

## Types

Public types live in `@rythra/types` and are still re-exported from `@rythra/core` and `rythra`.

## Peer ranges

Workspace packages are versioned together at `0.3.0`; internal peer ranges are `^0.3.0`.

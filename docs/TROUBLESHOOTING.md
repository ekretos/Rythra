# Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `ConfigurationError: Lavalink node password is required.` | No `password` on a node (the old default was removed in 0.3.0). | Pass `password` (for example `process.env.LAVALINK_PASSWORD`). |
| Node never connects and `reconnectFailed` fires after an `Unexpected server response: 401/403` error | Wrong Lavalink password. Rythra stops retrying rejected credentials. | Fix the password, then call `node.connect()` again. |
| `No connected Lavalink nodes available.` | `createPlayer`/`search` ran before a node reached `ready`. | `await rythra.connect()` and wait for `nodeConnect` first. |
| `Missing Discord voice state for guild …` | The voice server update arrived before the voice state update. | Ensure the connector's `listen()` is running and the bot joined the channel. |
| `Lavalink REST request timed out` | Node unreachable or slow; see `restTimeout` (seconds). | Check host, port and `secure`; raise `restTimeout`. |
| `Malformed JSON in Lavalink response` | A proxy or non-Lavalink server answered. | Verify the host and port point at Lavalink. |
| Players stop when a node goes down | Failover is opt-in. | Set `failover: true`; players move to another ready node and playback resumes from the last reported position. |
| `ERR_MODULE_NOT_FOUND` for a relative import | Using a pre-0.3.0 build under Node ESM. | Upgrade to 0.3.0. |

## Failover notes

- Failover waits `failoverDelay` ms (default 5000) for the node to recover before moving players.
- Needs a second connected node and the guild's Discord voice data; otherwise `playerMigrateFailed` is emitted and the player stays put.
- Playback resumes from the last position Lavalink reported, which can be a few seconds behind.
- The previous node's player is not deleted remotely; it expires with that node's session.
- Failover has been exercised only against mocks, not a live Lavalink cluster.

## Lavalink compatibility

Rythra selects the v4 or v5 protocol adapter from the node's `/version`. v5 behavior follows the adapter's documented endpoints but has not been verified against a live v5 server; session resume is not verified for either.

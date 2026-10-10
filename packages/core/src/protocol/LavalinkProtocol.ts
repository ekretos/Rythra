import type { LavalinkApiVersion } from '@rythra/types';
export type { LavalinkApiVersion, LavalinkApiVersionMode } from '@rythra/types';
/** Resolves the HTTP/WebSocket API prefix for a Lavalink generation. */
export function getLavalinkApiPath(version: LavalinkApiVersion): string { return `/v${version}`; }
/** Converts a Lavalink semantic server version into a supported API generation. */
export function getLavalinkApiVersion(semver: string): LavalinkApiVersion {
    const major = Number.parseInt(semver.split('.')[0] ?? '', 10);
    if (major === 4 || major === 5) return major;
    throw new Error(`Unsupported Lavalink major version: ${semver}`);
}

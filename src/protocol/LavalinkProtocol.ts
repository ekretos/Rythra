/** Supported Lavalink API generations. */
export type LavalinkApiVersion = 4 | 5;

/** How Rythra should determine the Lavalink API generation. */
export type LavalinkApiVersionMode = LavalinkApiVersion | 'auto';

/**
 * Resolves the HTTP/WebSocket API prefix for a Lavalink generation.
 * Keeping this in one place makes future protocol changes isolated from
 * Player, Node and REST code.
 */
export function getLavalinkApiPath(version: LavalinkApiVersion): string {
    return `/v${version}`;
}

/**
 * Parses a Lavalink semantic version and returns its supported API major.
 * Unknown future versions are intentionally rejected until their protocol
 * behavior has been explicitly implemented.
 */
export function getLavalinkApiVersion(semver: string): LavalinkApiVersion {
    const major = Number.parseInt(semver.split('.')[0] ?? '', 10);

    if (major === 4 || major === 5) return major;

    throw new Error(`Unsupported Lavalink major version: ${semver}`);
}

/**
 * Supported Lavalink API generations.
 *
 * @remarks
 * Rythra keeps protocol generation handling behind a small boundary so the
 * public manager and player APIs do not need to know about Lavalink changes.
 */
export type LavalinkApiVersion = 4 | 5;

/**
 * Controls how Rythra selects a Lavalink API generation.
 *
 * @remarks
 * `auto` asks the node for its server version before opening the WebSocket.
 */
export type LavalinkApiVersionMode = LavalinkApiVersion | 'auto';

/**
 * Resolves the HTTP/WebSocket API prefix for a Lavalink generation.
 *
 * @param version The Lavalink API generation.
 * @returns The API path prefix used by REST and WebSocket endpoints.
 */
export function getLavalinkApiPath(version: LavalinkApiVersion): string {
    return `/v${version}`;
}

/**
 * Converts a Lavalink semantic server version into a supported API generation.
 *
 * @param semver The Lavalink server version, such as `4.2.2`.
 * @returns The supported Lavalink API generation.
 * @throws {Error} If the server version is not supported by Rythra.
 */
export function getLavalinkApiVersion(semver: string): LavalinkApiVersion {
    const major = Number.parseInt(semver.split('.')[0] ?? '', 10);

    if (major === 4 || major === 5) return major;

    throw new Error(`Unsupported Lavalink major version: ${semver}`);
}

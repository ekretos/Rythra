import type { NodeOptions, PlayerOptions, Track } from './Types';

/** Validates node configuration before a network connection is attempted. */
export function validateNodeOptions(options: NodeOptions): void {
    if (!options.host.trim()) throw new TypeError('Node host is required.');
    if (options.port !== undefined && (!Number.isInteger(options.port) || options.port < 1 || options.port > 65535)) throw new RangeError('Node port must be an integer between 1 and 65535.');
    if (options.retryInterval !== undefined && (!Number.isFinite(options.retryInterval) || options.retryInterval < 0)) throw new RangeError('retryInterval must be a non-negative number.');
    if (options.retryAmount !== undefined && (!Number.isInteger(options.retryAmount) || options.retryAmount < 0)) throw new RangeError('retryAmount must be a non-negative integer.');
}

/** Validates guild player configuration. */
export function validatePlayerOptions(options: PlayerOptions): void {
    if (!options.guild.trim()) throw new TypeError('Player guild ID is required.');
    if (!options.voiceChannel.trim()) throw new TypeError('Player voice channel ID is required.');
    if (!options.textChannel.trim()) throw new TypeError('Player text channel ID is required.');
}

/** Validates the minimum shape required for an encoded track. */
export function validateTrack(track: Track): void {
    if (!track.encoded || typeof track.encoded !== 'string') throw new TypeError('Track encoded data is required.');
    if (!track.info?.identifier || !track.info.title) throw new TypeError('Track info must contain an identifier and title.');
}

import type { LavalinkProtocol } from "../version.js";

/** Lavalink v5 protocol capabilities. Keep wire-specific behavior in this version boundary. */
export const V5_PROTOCOL: LavalinkProtocol = {
    capabilities: {
        version: "v5",
        sessionResume: true,
        filters: true,
        dave: true,
    },
};

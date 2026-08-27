import type { LavalinkProtocol } from "../version.js";

/** Lavalink v4 protocol capabilities. */
export const V4_PROTOCOL: LavalinkProtocol = {
    capabilities: {
        version: "v4",
        sessionResume: true,
        filters: true,
        dave: false,
    },
};

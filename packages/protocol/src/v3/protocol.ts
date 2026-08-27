import type { LavalinkProtocol } from "../version.js";

/** Lavalink v3 protocol capabilities. */
export const V3_PROTOCOL: LavalinkProtocol = {
    capabilities: {
        version: "v3",
        sessionResume: true,
        filters: true,
        dave: false,
    },
};

/**
 * Discord voice encryption capability exposed by a connector.
 *
 * @remarks
 * DAVE negotiation/encryption is owned by the Discord voice stack. Rythra
 * must not reimplement cryptography; it exposes the capability boundary so a
 * connector can report and validate support end-to-end.
 */
export interface DaveCapabilities {
    /** Whether the connector's voice implementation supports DAVE. */
    readonly supported: boolean;
    /** Optional implementation version or protocol identifier. */
    readonly version?: string;
}

/** Connector-side DAVE capability contract. */
export interface DaveProvider {
    /** Returns the connector's current DAVE capabilities. */
    getDAVECapabilities(): DaveCapabilities;
}

/** Returns DAVE capabilities when a connector implements the optional contract. */
export function getDAVECapabilities(connector: unknown): DaveCapabilities {
    if (typeof connector === 'object' && connector !== null && 'getDAVECapabilities' in connector) {
        const provider = connector as DaveProvider;
        return provider.getDAVECapabilities();
    }
    return { supported: false };
}

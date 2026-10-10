import type { LavalinkRestError } from '@rythra/types';
import type { RestTransport, TransportRequest } from './Transport.js';

/** Error thrown when Lavalink answers a REST call with a failure payload. */
export class RestError extends Error {
    /** Error timestamp reported by Lavalink. */ public readonly timestamp: number;
    /** HTTP status code. */ public readonly status: number;
    /** Error type reported by Lavalink. */ public readonly error: string;
    /** Request path. */ public readonly path: string;
    /** Optional stack trace reported by Lavalink. */ public readonly trace?: string;

    /** Creates a REST error from a Lavalink error payload. */
    public constructor(data: LavalinkRestError) {
        super(data.message);
        this.name = 'RestError';
        this.timestamp = data.timestamp;
        this.status = data.status;
        this.error = data.error;
        this.path = data.path;
        this.trace = data.trace;
    }
}

/** REST transport backed by the runtime's native `fetch` implementation. */
export class FetchRestTransport implements RestTransport {
    /** Performs a request and resolves the decoded JSON body, if any. */
    public async request<T = unknown>(request: TransportRequest): Promise<T | undefined> {
        const url = new URL(request.url);
        if (request.params) url.search = new URLSearchParams(request.params).toString();
        const method = request.method?.toUpperCase() ?? 'GET';
        const abortController = new AbortController();
        const timeout = setTimeout(() => abortController.abort(), Math.max(0, request.timeout ?? 10_000));
        const init: RequestInit = { method, headers: request.headers ?? {}, signal: abortController.signal };
        if (!['GET', 'HEAD'].includes(method) && request.body !== undefined) init.body = JSON.stringify(request.body);
        const label = `${method} ${url.pathname}`;
        try {
            let response: Response;
            try {
                response = await fetch(url.toString(), init);
            } catch (error) {
                if (abortController.signal.aborted) throw new Error(`Lavalink REST request timed out: ${label}`, { cause: error });
                throw new Error(`Lavalink REST request failed: ${label}`, { cause: error });
            }
            if (!response.ok) {
                const payload = (await response.json().catch(() => null)) as LavalinkRestError | null;
                throw new RestError(payload ?? { timestamp: Date.now(), status: response.status, error: 'Unknown Error', message: 'Unexpected error response from Lavalink server', path: url.pathname });
            }
            if (response.status === 204) return;
            const text = await response.text();
            if (!text) return;
            try { return JSON.parse(text) as T; } catch (error) { throw new Error(`Malformed JSON in Lavalink response: ${label}`, { cause: error }); }
        } finally {
            clearTimeout(timeout);
        }
    }
}

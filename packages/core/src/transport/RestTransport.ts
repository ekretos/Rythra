import type { LavalinkRestError } from '../Types';
import type { RestTransport, TransportRequest } from './Transport';

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
        try {
            const response = await fetch(url.toString(), init);
            if (!response.ok) {
                const payload = (await response.json().catch(() => null)) as LavalinkRestError | null;
                throw new RestError(payload ?? { timestamp: Date.now(), status: response.status, error: 'Unknown Error', message: 'Unexpected error response from Lavalink server', path: url.pathname });
            }
            if (response.status === 204) return;
            try { return (await response.json()) as T; } catch { return; }
        } finally {
            clearTimeout(timeout);
        }
    }
}

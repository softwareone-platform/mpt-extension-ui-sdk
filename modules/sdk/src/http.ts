import axios from 'axios';

export const REQUEST_TOKEN_EVENT_TYPE = '$requesttoken' as const;
export const REPORT_TOKEN_EVENT_TYPE = '$reporttoken' as const;

function base64Decode(str: string) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    const pad = str.length % 4;
    if (pad) str += "=".repeat(4 - pad);
    const binary = atob(str);
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
}

export function parseJWT(token: string) {
    const [,p] = token.split(".");
    return JSON.parse(base64Decode(p));
}

const isExpired = (jwt: string) => {
    if (!jwt) return true;
    const { exp } = parseJWT(jwt);
    return exp - Date.now() > 60 * 1000;
}

const http = (() => {
    const emit = window.__MPT__?.emit;
    const listen = window.__MPT__?.listen;

    let $token = null;
    const client = axios.create();

    client.interceptors.request.use(async (config) => {
        if (isExpired($token)) {
            $token = await new Promise<string>((resolve) => {
                const stop = listen(REPORT_TOKEN_EVENT_TYPE, ({ token }) => {
                    stop();
                    resolve(token);
                });

                emit(REQUEST_TOKEN_EVENT_TYPE);
            });
        }

        (config.headers as any).Authorization = `Bearer ${$token}`;

        return config;
    })

    return client;
})();

export default http;


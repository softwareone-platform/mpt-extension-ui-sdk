import { useEffect } from 'react';

export function useMPTListen(event: string, handler: (data?: any) => void, dependencies: any[] = []) {
    useEffect(() => window.__MPT__.listen(event, handler), [event, ...dependencies]);
}
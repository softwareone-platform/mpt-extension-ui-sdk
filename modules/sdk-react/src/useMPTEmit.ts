import { useCallback } from 'react';

export function useMPTEmit() {
    return useCallback((event: string, data: any) => window.__MPT__.emit(event, data), []);
}
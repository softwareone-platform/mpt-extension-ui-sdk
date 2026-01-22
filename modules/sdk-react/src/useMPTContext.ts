import { useEffect, useState } from 'react';

export function useMPTContext<T extends object = any>(): T {
    const [context, setContext] = useState<T>(window.__MPT__.context as T);

    useEffect(() => {
        setContext(window.__MPT__.context);

        window.__MPT__.onChange((data: T) => {
            setContext(data);
        });
    }, []);

    return context;
}
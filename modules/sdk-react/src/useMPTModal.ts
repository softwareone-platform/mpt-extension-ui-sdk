import { useCallback, useRef, useEffect, useMemo } from 'react';

import {
    useMPTEmit,
    useMPTListen,
} from '.';

type ModalCloseCallback = (data?: any) => void;
type ModalContext = object;

interface ModalSessionConfig {
    onClose?: ModalCloseCallback,
    context?: ModalContext,
}

const REQUEST_MODAL_CLOSE_EVENT = '$close';
const REPORT_MODAL_CLOSE_EVENT = '$closed';
const REQUEST_MODAL_OPEN_EVENT = '$open';

const noop = (...args: any[]) => {};

export function useMPTModal() {
    const emit = useMPTEmit();
    const closeCallback = useRef<ModalCloseCallback>(noop);

    const open = useCallback((id: string, config: ModalSessionConfig) => {
        if (!id) return;
        if (config?.onClose) closeCallback.current = config?.onClose;

        emit(REQUEST_MODAL_OPEN_EVENT, {
            id,
            context: config?.context ?? {},
        });
    }, [emit]);

    const close = useCallback((data?: any) => {
        emit(REQUEST_MODAL_CLOSE_EVENT, data);
    }, [emit]);

    useMPTListen(
        REPORT_MODAL_CLOSE_EVENT,
        (data: any) => {
            close(data);
            closeCallback?.current?.(data);
            closeCallback.current = noop;
        },
        [close],
    );

    return useMemo(() => ({
        open,
        close,
    }), [
        open,
        close,
    ]);
}
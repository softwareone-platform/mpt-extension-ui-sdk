type EventListenerRemoveCallback = () => void;
type EventHandler = (data?: any) => void;
type EventEmitter = (type: string, data?: any) => void;
type EventListener = (type: string, callback: EventHandler) => EventListenerRemoveCallback;

declare global {
    interface Window {
        __MPT__: {
            context: any,
            onChange: EventHandler,
            emit: EventEmitter,
            listen: EventListener,
        }
    }
}

export {};
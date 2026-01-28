# SoftwareONE Marketplace extensions UI React SDK

## Installation

```bash
  npm i @mpt-extension/react-sdk
```

## Usage

### useMPTContext
Provides a current context communicated from SoftwareONE Marketplace Platform as React state

```tsx
import { useMPTContext } from '@mpt-extension/react-sdk';

// For context expected to be `{ order: Order }`
export default function App() {
    const { order } = useMPTContext();
    
    return <span>{ order.id }</span>;
}
```

### useMPTModal
Allows opening/closing pieces of you Extension UI in modal

```tsx
import { useCallback } from 'react';
import { useMPTModal } from '@mpt-extension/react-sdk';

// For main UI Plug
export function App() {
    const context = useMPTContext();
    const { open } = useMPTModal();
    const [termsAccepted, setTermsAccepted] = useState(false);

    const onClose = useCallback(({ accepted }) => {
        setTermsAccepted(accepted);
    }, []);

    return <>
        <button
            onClick={() => open('confirmation-modal', {
                context,
                onClose,
            })}
        >
            Confirm terms
        </button>
    </>
}

// For Plug { id: 'confirmation-modal' ... }
export function ConfirmationModal() {
    const { close } = useMPTModal();

    return <>
        <p>Terms and conditions...</p>
        
        <button onClick={() => close({ accepted: true })}>
            Accept
        </button>
        
        <button onClick={() => close({ accepted: false })}>
            Decline
        </button>
    </>;
}
```

### useMPTEmit
Allows sending events to SoftwareONE Marketplace Platform UI
N.B.: Only those events that are handled on the level of the platform will be processed
Emit event only if you know someone is listening

```tsx
import { useMPTEmit } from '@mpt-extension/react-sdk';

export default function App() {
    const emit = useMPTEmit();
    
    return <button onClick={() => emit(
        'confirmed', // Event name
        { data: 'Some additional data' } // Additional data
    )}>
        Confirm
    </button>;
}
```

### useMPTListen
Allows handling events dispatched by SoftwareONE Marketplace Platform UI
N.B.: Only those events that are dispatched on the level of the platform will handled
Listen events only if you know someone is dispatching

```tsx
import { useMPTListen } from '@mpt-extension/react-sdk';

export default function App() {
    const process = useCallback(() => {/*...*/}, []);
    
    useMPTListen(
        'foo', // Event name
        (data) => { process(data) }, // Event handler 
        [process], // dependencies array
    );
    
    return <></>;
}
```


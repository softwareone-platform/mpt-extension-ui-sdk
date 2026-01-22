# SoftwareONE Marketplace extensions UI SDK

## Installation

```bash
  npm i @swo/sdk
```

## Usage
```tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { setup } from '@swo/sdk';
import App from './App';

setup((element: Element) => {
    const root = createRoot(element);
    root.render(<App/>);
});
```
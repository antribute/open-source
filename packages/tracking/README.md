# Antribute React Utilities

Shared React utilities for Antribute projects

## Installation

```bash
pnpm i @antribute/utils-react
```

## Running Storybook for Local Development

```bash
pnpm run storybook:start
```

## Usage

This package exports many components, each with their own seperate usage docs

### `createCtx`

```tsx
import { createCtx } from '@antribute/utils-react';

const [useContext, ContextProvider] = createCtx<{ foo: string }>();

function TestComponent() {
  const context = useContext();
  return <h1>{context.foo}</h1>;
}

<ContextProvider value={{ foo: 'bar' }}>
  <TestComponent />
</ContextProvider>;
```

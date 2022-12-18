import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import createCtx from './createCtx.js';

describe('createCtx', () => {
  it('should throw an error when a component uses the context without the provider', () => {
    const [useContext] = createCtx<{ foo: string }>();
    function TestComponent() {
      const context = useContext();
      return <h1>{context.foo}</h1>;
    }
    expect(() => render(<TestComponent />)).toThrow();
  });

  it('should appropriately provide context to children of the provider', () => {
    const [useContext, ContextProvider] = createCtx<{ foo: string }>();
    function TestComponent() {
      const context = useContext();
      return <h1>{context.foo}</h1>;
    }
    render(
      <ContextProvider value={{ foo: 'bar' }}>
        <TestComponent />
      </ContextProvider>
    );
    screen.getByText('bar');
  });
});

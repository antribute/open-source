import React from 'react';

export function createCtx<ContextType>() {
  const ctx = React.createContext<ContextType | undefined>(undefined);
  function useContext() {
    const context = React.useContext(ctx);

    const noContext = !context;

    if (noContext) {
      throw new Error('useContext hook does not have a Provider.');
    }

    return context;
  }
  return { useContext, Provider: ctx.Provider } as const;
}

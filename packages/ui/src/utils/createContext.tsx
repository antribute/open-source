import React from 'react';

function _createCtx<TCtx>(options?: { ignoreNoContextError?: boolean }) {
  const { ignoreNoContextError } = options ?? {};
  const ctx = React.createContext<TCtx | undefined>(undefined);

  function useContext() {
    const context = React.useContext(ctx);

    const noContext = !context;

    if (!ignoreNoContextError && noContext) {
      throw new Error('useContext hook does not have a Provider.');
    }

    return context as TCtx;
  }

  return {
    useContext,
    Provider: ctx.Provider,
  };
}

export function createCtx<TCtx>() {
  return _createCtx<TCtx>();
}

export function createCtxNoCheck<TCtx>() {
  return _createCtx<TCtx | undefined>({ ignoreNoContextError: true });
}

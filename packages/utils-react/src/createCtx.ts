import { createContext, useContext } from 'react';

function createCtx<ContextType extends Record<string, unknown>>() {
  const globalContext = createContext<ContextType | undefined>(undefined);
  const SafeContextProvider = globalContext.Provider;
  const useSafeContext = () => {
    const localContext = useContext(globalContext);
    if (!localContext)
      throw new Error(
        `The useContext function must be inside a ${
          globalContext.displayName ?? 'Context'
        } provider with a value`
      );
    return localContext;
  };
  return [useSafeContext, SafeContextProvider] as const;
}

export default createCtx;

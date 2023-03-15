import { screens } from '@antribute/zephyr-core';
import { mapValues } from 'lodash-es';
import { useMediaQuery } from './useMediaQuery';

export type Breakpoint = Extract<keyof typeof screens, string>;

type BreakpointMap = Partial<Record<Breakpoint, undefined>>;

export function useBreakpoint<
  TBreakpoint extends Breakpoint | BreakpointMap,
  TReturn extends TBreakpoint extends BreakpointMap ? Record<keyof TBreakpoint, boolean> : boolean
>(breakpoint: TBreakpoint): TReturn {
  // const screen = screens[breakpoint] as string;

  const mediaQuery = (screen: string) => `(min-width: ${screen})`;

  // const query = Array.isArray(breakpoint) ? breakpoint.map((key)=> [key, mediaQuery(screens[key])]) : screens[breakpoint]

  function getQuery() {
    if (typeof breakpoint === 'string') {
      return screens[breakpoint as Breakpoint];
    }

    return mapValues(breakpoint, (_, key) => {
      return mediaQuery(screens[key as Breakpoint] as string);
    }) as Record<string, string>;
  }

  const query = getQuery();

  return useMediaQuery(query) as TReturn;
}

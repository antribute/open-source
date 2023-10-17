import type { BreakpointKey } from 'hooks';
import { useBreakpoints } from 'hooks';
import type { ZeroTo100 } from 'types/numeric-types';
import { objectMap } from 'utils';

interface PanelData<T extends number = number> {
  minSize?: T;
  maxSize?: T;
  defaultSize?: T;
  resizeable?: boolean;
  collapsed?: boolean;
  collapsible?: boolean;
}

export type PanelSizeBreakpointMap<T extends number = number> = Record<
  string,
  Partial<Record<BreakpointKey, T | PanelData<T>>>
>;

export type UsePanelSizeBreakpointsReturn<T> = Record<keyof T, PanelData>;

export const usePanelSizeBreakpoints = <T extends PanelSizeBreakpointMap<ZeroTo100> | undefined>({
  breakpoints,
}: {
  breakpoints?: PanelSizeBreakpointMap;
}) => {
  const breakpointMap = useBreakpoints();

  if (!breakpoints) return {} as UsePanelSizeBreakpointsReturn<T>;

  return objectMap(breakpoints, ({ key, value }) => {
    if (typeof value === 'number' || !value) {
      return [key, value];
    }

    const enabledSizeBreakpoints = Object.entries(value)
      .reverse()
      .filter((entry) => {
        const sizeBreakpoint = entry[0] as BreakpointKey;
        const enabled = breakpointMap[sizeBreakpoint];

        return enabled;
      });

    const firstEnabledBreakpoint = enabledSizeBreakpoints[0];

    const breakpointSize = firstEnabledBreakpoint?.[1];

    const sizeData = (
      typeof breakpointSize === 'number'
        ? {
            maxSize: breakpointSize,
            minSize: breakpointSize,
            defaultSize: breakpointSize,
          }
        : {
            ...breakpointSize,
          }
    ) satisfies PanelData;

    return [key, sizeData];
  }) as UsePanelSizeBreakpointsReturn<T>;
};

/* eslint-disable no-restricted-syntax */
import { screens } from '@antribute/zephyr-core';
import { mapKeys } from 'lodash-es';
import { useMediaQuery } from './useMediaQuery';

export type ScreenSizeKey = `$${keyof typeof screens | 'xs'}`;

type CapializedSizeKey<T extends ScreenSizeKey> = T extends `$${infer P}` ? Capitalize<P> : never;

type ScreenSizeMap = Record<ScreenSizeKey, string>;

const screenSizes = mapKeys(
  { ...screens, xs: `calc(${screens.sm} - 1px)` },
  (_, key) => `$${key}`
) as ScreenSizeMap;

type AndAboveBreakpoint = `${ScreenSizeKey}AndAbove`;

type AndBelowBreakpoint = `${ScreenSizeKey}AndBelow`;

type Between<
  T1 extends ScreenSizeKey,
  T2 extends ScreenSizeKey
> = `$between${CapializedSizeKey<T1>}${CapializedSizeKey<T2>}`;

type BreakpointKey = AndAboveBreakpoint | AndBelowBreakpoint | BetweenBreakpoint;

const andAbove = (size: ScreenSizeKey) => `(min-width: ${screenSizes[size]})`;
const andBelow = (size: ScreenSizeKey) => `(max-width: ${screenSizes[size]})`;
const between = (size1: ScreenSizeKey, size2: ScreenSizeKey) =>
  `(min-width: ${screenSizes[size1]}) and (max-width: calc(${screenSizes[size2]} - 1px))`;

type BetweenBreakpoint =
  | Between<'$xs', '$sm'>
  | Between<'$sm', '$md'>
  | Between<'$md', '$lg'>
  | Between<'$lg', '$xl'>
  | Between<'$xl', '$2xl'>;

export type Breakpoint = keyof typeof breakpointMediaQueryMap;

const breakpointMediaQueryMap = {
  $xsAndAbove: andAbove('$xs'),
  $xsAndBelow: andBelow('$xs'),
  $smAndAbove: andAbove('$sm'),
  $smAndBelow: andBelow('$sm'),
  $mdAndAbove: andAbove('$md'),
  $mdAndBelow: andBelow('$md'),
  $lgAndAbove: andAbove('$lg'),
  $lgAndBelow: andBelow('$lg'),
  $xlAndAbove: andAbove('$xl'),
  $xlAndBelow: andBelow('$xl'),
  $2xlAndAbove: andAbove('$2xl'),
  $2xlAndBelow: andBelow('$2xl'),
  $betweenXsSm: andAbove('$xs'),
  $betweenSmMd: andAbove('$sm'),
  $betweenMdLg: andAbove('$md'),
  $betweenLgXl: between('$lg', '$xl'),
  $betweenXl2xl: between('$xl', '$2xl'),
} satisfies Record<BreakpointKey, string>;

type BreakpointBooleanMap = Record<BreakpointKey, boolean>;

type UseBreakpointReturn<TBreakpoint extends BreakpointKey | undefined> = TBreakpoint extends string
  ? boolean
  : BreakpointBooleanMap;

export function useBreakpoint<
  TBreakpoint extends BreakpointKey | undefined = undefined,
  TReturn extends UseBreakpointReturn<TBreakpoint> = UseBreakpointReturn<TBreakpoint>
>(breakpointOption?: TBreakpoint): TReturn {
  function getQuery() {
    if (typeof breakpointOption === 'string') {
      return breakpointMediaQueryMap[breakpointOption as keyof typeof breakpointMediaQueryMap];
    }

    return breakpointMediaQueryMap;
  }

  const query = getQuery();

  const media = useMediaQuery(query);

  return media as TReturn;
}

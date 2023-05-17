/* eslint-disable no-restricted-syntax */
import { screens } from 'config';
import { useMediaQuery } from 'react-responsive';
import { objectMap } from 'utils/objectMap';
import { parseUnitValue } from 'utils/parseUnitValue';

export type BreakpointKey = `$${keyof typeof screens | 'xs'}`;

export type BreakpointMatchMap = Record<BreakpointKey, boolean>;

const screenSizes = {
  xs: calculateXsScreenSize(),
  ...screens,
};

const breakpoints = objectMap(screenSizes, ({ key, value: size }) => {
  return [`$${key}`, { above: `(min-width: ${size})`, below: `(max-width: ${size})` }];
});

export function useBreakpoints(): BreakpointMatchMap {
  const $xs = useMediaQuery({ query: breakpoints.$xs.below });
  const $sm = useMediaQuery({ query: breakpoints.$sm.above });
  const $md = useMediaQuery({ query: breakpoints.$md.above });
  const $lg = useMediaQuery({ query: breakpoints.$lg.above });
  const $xl = useMediaQuery({ query: breakpoints.$xl.above });
  const $2xl = useMediaQuery({ query: breakpoints.$2xl.above });

  const breakpointMap = {
    $xs,
    $sm,
    $md,
    $lg,
    $xl,
    $2xl,
  };

  return breakpointMap;
}

function calculateXsScreenSize() {
  const smallScreen = parseUnitValue(screens.sm);
  return `${smallScreen.value - 1}${smallScreen.unit!}`;
}

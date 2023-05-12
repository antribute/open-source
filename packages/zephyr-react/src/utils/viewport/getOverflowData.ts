import { getElement } from 'utils/getElement';

export type OverflowData = {
  hasOverflow: boolean;
  hasOverflowX: boolean;
  hasOverflowY: boolean;
  isScrollAtTopBoundary: boolean;
  isScrollAtBottomBoundary: boolean;
  isScrollAtLeftBoundary: boolean;
  isScrollAtRightBoundary: boolean;
  isScrollAtXBoundary: boolean;
  isScrollAtYBoundary: boolean;
};

export function getOverflowData(
  elementRef?: React.RefObject<HTMLElement> | HTMLElement | null
): OverflowData {
  const element = getElement(elementRef);

  const {
    scrollWidth = NaN,
    scrollHeight = NaN,
    scrollTop = NaN,
    scrollLeft = NaN,
    clientWidth = NaN,
    clientHeight = NaN,
  } = element ?? {};

  const hasOverflowX = scrollWidth > clientWidth;

  const hasOverflowY = scrollHeight > clientHeight;

  const hasOverflow = hasOverflowX || hasOverflowY;

  const isScrollAtTopBoundary = scrollTop === 0;

  const isScrollAtBottomBoundary = scrollHeight - scrollTop === clientHeight;

  const isScrollAtLeftBoundary = scrollLeft === 0;

  const isScrollAtRightBoundary = scrollWidth - scrollLeft === clientWidth;

  const isScrollAtXBoundary = isScrollAtLeftBoundary && isScrollAtRightBoundary;

  const isScrollAtYBoundary = isScrollAtTopBoundary && isScrollAtBottomBoundary;

  return {
    hasOverflowX,
    hasOverflowY,
    hasOverflow,
    isScrollAtTopBoundary,
    isScrollAtBottomBoundary,
    isScrollAtLeftBoundary,
    isScrollAtRightBoundary,
    isScrollAtXBoundary,
    isScrollAtYBoundary,
  };
}

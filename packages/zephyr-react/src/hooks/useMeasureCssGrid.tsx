import { parseInt, sum } from 'lodash-es';
import { useState, useEffect, useRef } from 'react';
import useDimensions from 'react-cool-dimensions';

type UseGridColumnsMeasureReturnType<T extends HTMLElement> = {
  gridRef: React.RefObject<T>;
  gridColumnWidths: number[];
  gridWidth: number;
  totalColumnWidths: number;
};

export function useMeasureCssGrid<T extends HTMLElement>(
  ref?: React.RefObject<T>
): UseGridColumnsMeasureReturnType<T> {
  const innerGridRef = useRef<T>(null);

  const gridRef = ref ?? innerGridRef;

  const [gridColumnWidths, setGridColumnWidths] = useState<number[]>([]);

  const { observe, unobserve, width } = useDimensions({
    onResize: ({ entry }) => {
      const newColumnWidths = calculateGridColumnWidths(entry.target);
      setGridColumnWidths(newColumnWidths);
    },
  });

  useEffect(() => {
    observe(gridRef.current);

    return () => {
      unobserve();
    };
  }, []);

  return { gridRef, gridColumnWidths, totalColumnWidths: sum(gridColumnWidths), gridWidth: width };
}

function calculateGridColumnWidths<T extends HTMLElement | Element | null>(el: T) {
  if (!el) return [];

  const { gridTemplateColumnsArray, columnCount, columnGap, gridWidth } = getGridStyles(el);

  function calculateWidth({ unit, value }: { unit?: string; value: number }) {
    if (unit === 'px') return value;
    if (unit === 'fr') {
      return calculateFrUnit(value, { columnCount, columnGap, gridWidth });
    }
    if (unit === '%') {
      return (gridWidth * value) / 100;
    }
    return 0;
  }

  return gridTemplateColumnsArray.map((e) => {
    return calculateWidth(e) + columnGap;
  });
}

function getGridStyles(el: Element) {
  const computedStyle = getComputedStyle(el);
  const columnCount = parseInt(computedStyle.columns);
  // const columnGap = parseInt(computedStyle.gap);
  const columnGap = parseInt(computedStyle.columnGap);

  const gridWidth = el.clientWidth;

  const gridTemplateColumnsArray = computedStyle
    .getPropertyValue('grid-template-columns')
    .trim()
    .split(/\s+/);

  return {
    gridTemplateColumnsArray: gridTemplateColumnsArray.map((e) => parseUnit(e)),
    columnCount,
    columnGap,
    gridWidth,
  };
}

function calculateFrUnit(
  value: number,
  {
    columnCount,
    columnGap,
    gridWidth,
  }: { columnCount: number; columnGap: number; gridWidth: number }
) {
  const totalGaps = columnGap * (columnCount - 1);
  const availableWidth = gridWidth - totalGaps;
  return (availableWidth / columnCount) * value;
}

function parseUnit(property: string) {
  const value = parseFloat(property);
  const match = property.match(/[a-zA-Z%]+/) ?? undefined;
  const unit = match?.[0];
  return { value, unit };
}

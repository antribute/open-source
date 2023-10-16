import { useEffect, useMemo, useRef } from 'react';
import useDimensions from 'react-cool-dimensions';
import { useImmer } from 'use-immer';
import { castDraft, enableMapSet } from 'immer';
import { sortBy } from 'lodash-es';
import type { OverflowData } from 'utils/viewport/getOverflowData';
import { getOverflowData } from 'utils/viewport/getOverflowData';
import { inView } from 'framer-motion';

export interface InViewOptions {
  root?: Element | Document;
  margin?: string;
  amount?: 'any' | 'all' | number;
}

enableMapSet();

export function useScrollIntoView<TViewportElement extends HTMLElement = HTMLDivElement>(options: {
  elements: Element[] | undefined | null;
  // viewport: HTMLElement | React.RefObject<HTMLElement> | undefined;
  shouldUpdate?: boolean;
  inViewAmount?: InViewOptions['amount'];
  inViewMargin?: InViewOptions['margin'];
  updateDependency?: unknown;
}) {
  const {
    elements,
    // viewport,
    // inViewMargin = '20px',
    shouldUpdate = true,
    updateDependency,
  } = options;

  const viewportRef = useRef<TViewportElement>(null);

  const [inViewState, updateInViewState] = useImmer<{
    previousElementId?: string;
    overflowData: OverflowData;
    inViewChildren: {
      id: string;
      index: number;
      entry: IntersectionObserverEntry;
    }[];
  }>({ overflowData: getOverflowData(), inViewChildren: [] });

  const {
    observe: observeViewport,
    width: viewportWidth,
    unobserve,
  } = useDimensions({
    onResize: () => {
      updateInViewState((draft) => {
        draft.overflowData = getOverflowData(viewportRef);
      });
    },
  });

  useEffect(() => {
    if (viewportRef.current) {
      observeViewport(viewportRef.current!);
    }

    return () => {
      unobserve();
    };
  }, [observeViewport, unobserve]);

  useEffect(() => {
    if (viewportRef.current) {
      updateInViewState((draft) => {
        draft.overflowData = getOverflowData(viewportRef.current);
      });
    }
  }, [updateInViewState]);

  useEffect(() => {
    const viewportElement = viewportRef.current;

    if (!elements || !viewportElement || !shouldUpdate) return;

    const unobserveList = elements.map((element, index) => {
      const unobserve = inView(
        element,
        (entry) => {
          updateInViewState((draft) => {
            const { id } = entry.target;

            if (!draft.inViewChildren.some((e) => e.id === id)) {
              const item = castDraft({ id, index, entry, element });
              draft.inViewChildren.push(item);

              const newArr = sortBy(draft.inViewChildren, (e) => e.index);
              draft.inViewChildren = newArr;

              draft.overflowData = getOverflowData(viewportRef);
            }
          });

          return (entry) => {
            const { id } = entry.target;

            updateInViewState((draft) => {
              const newArr = draft.inViewChildren.filter((e) => e.id !== id);

              draft.inViewChildren = sortBy(newArr, (e) => e.index);
            });
          };
        },
        {
          root: viewportElement,
          amount: 'all',
        }
      );

      return unobserve;
    });

    return () => {
      unobserveList.forEach((unobserve) => {
        unobserve();
      });
    };
  }, [elements, viewportRef, updateDependency, viewportWidth, shouldUpdate, updateInViewState]);

  const { nextLeftDirectionData, nextRightDirectionData } = useMemo(() => {
    const elementsList = elements ?? [];

    const { inViewChildren, previousElementId } = inViewState;

    interface NextDirectionData {
      nextIndexDelta: number;
      boundingIndex: number;
      inViewWindowStartIndex: number;
      leftScrollOffset: number | undefined;
      clampIndex: (x: number) => number;
    }

    const left: NextDirectionData = {
      nextIndexDelta: -1,
      boundingIndex: 0,
      inViewWindowStartIndex: 0,
      leftScrollOffset: 0,
      clampIndex: (x: number) => Math.max(x, 0),
    };

    const right: NextDirectionData = {
      nextIndexDelta: 1,
      boundingIndex: elementsList.length - 1,
      inViewWindowStartIndex: inViewChildren.length - 1,
      leftScrollOffset: viewportRef.current?.scrollWidth,
      clampIndex: (x: number) => Math.min(x, elementsList.length - 1),
    };

    const [nextLeftDirectionData, nextRightDirectionData] = [left, right].map((directionData) => {
      const {
        inViewWindowStartIndex,
        nextIndexDelta,
        clampIndex,
        boundingIndex,
        leftScrollOffset,
      } = directionData;

      const { index: inViewIndex = Number.NaN } = inViewChildren[inViewWindowStartIndex] ?? {};

      const nextIndex = clampIndex(inViewIndex + nextIndexDelta);

      const nextIndexIsSameAsBefore = Boolean(elementsList[nextIndex]?.id === previousElementId);

      const isBoundaryReached = nextIndex === boundingIndex;

      const nextElement =
        elementsList[nextIndexIsSameAsBefore ? nextIndex + nextIndexDelta : nextIndex];

      const nextElementId = nextElement?.id;

      return {
        nextElementId,
        nextIndex,
        nextElement,
        leftScrollOffset,
        isBoundaryReached,
        elements: elementsList,
        nextIsSameAsBefore: nextIndexIsSameAsBefore,
        meta: directionData,
      };
    });

    return {
      nextLeftDirectionData: nextLeftDirectionData!,
      nextRightDirectionData: nextRightDirectionData!,
    };
  }, [elements, inViewState]);

  function handleScroll(direction: 'left' | 'right') {
    const { nextElement, nextElementId, isBoundaryReached, leftScrollOffset } =
      direction === 'left' ? nextLeftDirectionData : nextRightDirectionData;

    if (isBoundaryReached) {
      viewportRef.current?.scrollTo({
        left: leftScrollOffset,
        behavior: 'smooth',
      });
    } else {
      nextElement?.scrollIntoView({
        behavior: 'smooth',
      });
    }

    updateInViewState((draft) => {
      draft.previousElementId = nextElementId;
    });
  }

  const { allElementsInView, inViewElementsCount } = useMemo(() => {
    const inViewElementsCount = inViewState.inViewChildren.length;

    const allElementsInView =
      (elements?.length ?? Number.NaN) === inViewState.inViewChildren.length;

    return { allElementsInView, inViewElementsCount };
  }, [inViewState, elements]);

  return {
    handleScroll,
    allElementsInView,
    inViewElementsCount,
    inViewChildren: inViewState.inViewChildren,
    viewportRef,
    viewportOverflowData: inViewState.overflowData,
    isLeftBoundaryReached: nextLeftDirectionData.isBoundaryReached,
    isRightBoundaryReached: nextRightDirectionData.isBoundaryReached,
  };
}

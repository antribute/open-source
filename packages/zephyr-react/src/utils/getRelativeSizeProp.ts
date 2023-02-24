import { clamp, isNaN } from 'lodash-es';
import { SizeProp } from 'types/styles';

export const getRelativeElementData = <T extends string>(
  delta: number,
  options: RelativeElementOptions<T>
) => {
  const { minElement, maxElement, elements = [] } = options;

  const middle = Math.floor(elements.length / 2);

  const { relativeElement = elements[middle] } = options;

  const [relative, min, max] = [relativeElement, minElement, maxElement].map((element) => {
    const lower = 0;

    const upper = Math.max(0, elements.length - 1);

    const unboundIndex = elements.findIndex((e) => e === element);

    const boundIndex = clamp(unboundIndex, lower, upper);

    const boundElement = elements[boundIndex];

    return {
      boundIndex,
      unboundIndex,
      boundElement,
      isBoundsExceeded: isNaN(unboundIndex) ? null : unboundIndex !== boundIndex,
    };
  });

  const {
    boundIndex: relativeIndex,
    // boundElement: relativeBoundElement,
    unboundIndex: originalRelativeIndex,
  } = relative!;

  const {
    boundIndex: upperBoundsIndex,
    boundElement: upperBoundElement,
    unboundIndex: originalMaxIndex,
  } = max!;

  const {
    boundIndex: lowerBoundIndex,
    boundElement: lowerBoundElement,
    unboundIndex: originalMinIndex,
  } = min!;

  const deltaIndex = relativeIndex + delta;

  const elementIndex = clamp(deltaIndex, lowerBoundIndex, upperBoundsIndex);

  const element = elements[elementIndex]!;

  const upperBoundsDistance = upperBoundsIndex - elementIndex;

  const lowerBoundsDistance = elementIndex - lowerBoundIndex;

  const isDeltaExceedingUpperBound = deltaIndex > upperBoundsIndex;

  const isDeltaExceedingLowerBound = deltaIndex < upperBoundsIndex;

  const isLowerBoundReached = upperBoundsIndex === deltaIndex;

  const isUpperBoundReached = lowerBoundIndex === deltaIndex;

  const isBoundsReached = isLowerBoundReached || isUpperBoundReached;

  const isDeltaExceedingBounds = isDeltaExceedingUpperBound || isDeltaExceedingLowerBound;

  return {
    element,
    elementIndex,
    relativeIndex,
    isBoundsReached,
    isDeltaExceedingBounds,
    isLowerBoundReached,
    isUpperBoundReached,
    isDeltaExceedingLowerBound,
    isDeltaExceedingUpperBound,
    upperBoundsDistance,
    lowerBoundsDistance,
    meta: {
      originalElements: elements,
      originalMaxElement: maxElement,
      originalMinElement: minElement,
      originalRelativeIndex,
      originalMinIndex,
      originalMaxIndex,
      elementDeltaString: [
        delta > 0 && `▲ (${delta})`,
        delta < 0 && `🔻 (${delta})`,
        `${element}__${elementIndex} from ${relativeElement ?? ''}__${relativeIndex}`,
        !delta && `0 delta`,
        `${relativeElement ?? 'N/A'} -> ${element}`,
        `Bounds: [${lowerBoundElement ?? ''}, ${
          upperBoundElement ?? ''
        }] [${lowerBoundIndex}, ${upperBoundsIndex}]`,
        isUpperBoundReached && 'Upper Bounds Reached',
        isLowerBoundReached && 'Lower Bounds Reached',
        isDeltaExceedingLowerBound && 'Delta Exceeding Lower Bound',
        isDeltaExceedingUpperBound && 'Delta Exceeding Upper Bound',
      ]
        .filter(Boolean)
        .join(' :: '),
    },
  };
};

export interface RelativeSizePropDataOptions<
  TOptions extends RelativeElementOptions<SizeProp> = RelativeElementOptions<SizeProp>
> {
  sizes?: TOptions['elements'];
  minSize?: TOptions['minElement'];
  maxSize?: TOptions['maxElement'];
  relativeSize?: TOptions['relativeElement'];
}
export const getRelativeSizePropData = (
  /** The number that the relative size will be incremented or decremented by */
  sizeChange: number,
  options: RelativeSizePropDataOptions
) => {
  const {
    relativeSize = 'md',
    minSize = 'xs',
    maxSize = 'lg',
    sizes = ['xs', 'sm', 'md', 'lg'],
  } = options;

  const {
    element: sizeProp,
    elementIndex: sizePropIndex,
    relativeIndex: relativeSizePropIndex,
    meta: {
      originalMaxElement: originalMaxSizeProp,
      originalMaxIndex: originalMaxSizePropIndex,
      originalRelativeIndex: originalRelativeSizeIndex,
      originalElements: originalSizes,
      originalMinElement: originalMinSizeProp,
      originalMinIndex: originalMinSizeIndex,
      elementDeltaString: sizeDeltaString,
    },
    ...rest
  } = getRelativeElementData<SizeProp>(sizeChange, {
    elements: sizes,
    relativeElement: relativeSize,
    minElement: minSize,
    maxElement: maxSize,
  });

  return {
    sizeProp,
    sizePropIndex,
    relativeSizePropIndex,
    meta: {
      originalMaxSizeProp,
      originalMaxSizePropIndex,
      originalRelativeSizeIndex,
      originalSizes,
      originalMinSizeProp,
      originalMinSizeIndex,
      sizeDeltaString,
    },
    ...rest,
  };
};

/**
 * Get a size property relative to another size property
 *
 * @example
 *
 * const size = getRelativeSizeProp(-10, {relativeSize: "lg", minSize: "sm", maxSize: "lg"})
 *
 * console.log(size) // Output: "sm"
 *
 */
export const getRelativeSizeProp = (
  /** The number that the relative size will be incremented or decremented by */
  sizeChange: number,
  options: RelativeSizePropDataOptions
) => {
  const { sizeProp } = getRelativeSizePropData(sizeChange, options);

  return sizeProp;
};

interface RelativeElementOptions<T extends string = string> {
  relativeElement?: T | undefined;
  minElement?: T;
  maxElement?: T;
  elements?: T[];
}

const a = getRelativeSizeProp(2, { relativeSize: 'sm' });

import { clamp } from 'lodash-es';
import { SizeProp } from 'types/styles';

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
  options: {
    relativeSize: SizeProp;
    minSize?: SizeProp;
    maxSize?: SizeProp;
  }
): SizeProp => {
  const { relativeSize = 'md', minSize = 'xs', maxSize = 'lg' } = options || {};

  const sizeArr: SizeProp[] = ['xs', 'sm', 'md', 'lg'];

  const relativeSizeIndex = sizeArr.indexOf(relativeSize);

  const minSizeIndex = sizeArr.indexOf(minSize);

  const maxSizeIndex = sizeArr.indexOf(maxSize);

  const sizeChangeIndex = relativeSizeIndex + sizeChange;

  const sizeIndex = clamp(sizeChangeIndex, minSizeIndex, maxSizeIndex);

  return sizeArr[sizeIndex]!;
};

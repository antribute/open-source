import { clamp, sum as lodashSum } from 'lodash-es';

export function percentClamp<T>(v: T, options?: { min?: number | null; max?: number | null }) {
  const min = options?.min ?? 0;
  const max = options?.max ?? 100;

  if (typeof v === 'undefined') return v;

  if (typeof v === 'number') return clamp(v, Math.max(0, min), Math.min(100, max || 100));

  return undefined;
}

export function scaleNumbers<T extends (number | undefined | null)[]>(
  numbers: T,
  maxSum: number
): T {
  const sum = lodashSum(numbers);

  if (sum <= maxSum) {
    // No scaling required, sum is already within the limit
    return numbers;
  }

  const scalingFactor = maxSum / sum;

  const scaledNumbers = numbers.map((num) => {
    if (num === undefined || num === null) return num;

    return num * scalingFactor;
  });

  return scaledNumbers as T;
}

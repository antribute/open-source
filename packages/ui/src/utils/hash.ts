export function stringToArrayElement<TArray extends unknown[]>(
  str: string | undefined,
  arr: TArray,
  fallback?: TArray[number]
): TArray[number] {
  if (!str) return fallback;

  const hash = hashCode(str);

  const index = Math.abs(hash % arr.length);

  return arr[index]!;
}

function hashCode(s: string): number {
  const A = 54059;
  const B = 76963;
  const C = 86969;
  const hash = 37;

  let h = hash;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < s.length; i++) {
    // eslint-disable-next-line no-bitwise
    h = (h * A) ^ (s.charCodeAt(i) * B);
  }
  h = (h * C) % 4294967296;

  return h;
}

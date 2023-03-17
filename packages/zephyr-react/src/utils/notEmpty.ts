export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function notEmptyEntry<TValue>(
  entry: [string, TValue | null | undefined]
): entry is [string, TValue] {
  const value = entry[1];
  return value !== null && value !== undefined;
}

export function notFalsy<TValue>(value: TValue | null | undefined): value is TValue {
  return Boolean(value);
}

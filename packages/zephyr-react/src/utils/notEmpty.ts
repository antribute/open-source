export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function notFalsy<TValue>(value: TValue | null | undefined): value is TValue {
  return Boolean(value);
}

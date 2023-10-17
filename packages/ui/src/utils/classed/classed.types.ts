import type { Classed } from 'utils/classed/classed';

type InferrableClassedType = Classed.VariantProps<any> extends Classed.VariantProps<infer U>
  ? U
  : never;

/** Gets the Variant props from a classed type and removes the 'true' and 'false' string values as options */
export type ClassedVariantProps<
  T extends InferrableClassedType,
  TVariantProps extends Classed.VariantProps<T> = Classed.VariantProps<T>
> = { [K in keyof TVariantProps]: Exclude<TVariantProps[K], 'true' | 'false'> };

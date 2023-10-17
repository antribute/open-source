import type { Path } from '@clickbar/dot-diver';
import type { O } from 'ts-toolbelt';
import type { StringDigit } from 'type-fest/source/internal';

export type StripPostfix<
  TKey extends string,
  TPostfix extends string
> = TKey extends `${infer K}${TPostfix}` ? K : TKey;

export type OptionalExceptFor<T extends object, K extends keyof T> = O.Optional<T, keyof T> &
  Required<Pick<T, K>>;

export type RemoveTrailingNumericString<T extends string> = T extends `${infer Head}${StringDigit}`
  ? RemoveTrailingNumericString<Head>
  : T;

export type RemoveNumberPostfix<T extends string, TDelimeter extends string = '-'> = StripPostfix<
  RemoveTrailingNumericString<T>,
  TDelimeter
>;

export type HasPostfix<
  T extends string,
  TPostfix extends string
> = T extends `${infer _}${TPostfix}` ? true : false;

export type DotToDash<
  T,
  S extends Extract<T, string> = Extract<T, string>
> = S extends `${infer L}.${infer R}` ? `${L}-${DotToDash<R>}` : S;

export type ParamCasePathName<T extends Record<string, unknown>> = DotToDash<Path<T>>;

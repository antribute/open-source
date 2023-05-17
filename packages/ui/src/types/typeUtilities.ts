/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { O, String } from 'ts-toolbelt';
import { StringDigit } from 'type-fest/source/internal';

export type IsUnion<T, U = T> = T extends any ? (U extends T ? false : true) : never;

export type IsMemberOfUnion<T, U> = Extract<T, U> extends never ? false : true;

export type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNever<T> = [T] extends [never] ? true : false;

export type IsUnknown<T> = IsNever<T> extends true
  ? false
  : IsAny<T> extends true
  ? false
  : unknown extends T
  ? true
  : false;

export type IsPrimitive<T> = T extends
  | string
  | number
  | boolean
  | bigint
  | symbol
  | undefined
  | null
  ? true
  : false;

export type IsArray<T> = T extends any[] ? true : false;

export type IsEmptyArray<T> = T extends [] ? true : false;

export type GetArrayElement<T> = T extends (infer U)[] ? U : never;

export type StartsWithNumber<T extends string> = String.At<T, 0> extends StringDigit ? true : false;

export type StripPrefix<
  TKey extends string,
  TPrefix extends string
> = TKey extends `${TPrefix}${infer K}` ? K : TKey;

export type StripPostfix<
  TKey extends string,
  TPostfix extends string
> = TKey extends `${infer K}${TPostfix}` ? K : TKey;

export type HasPrefix<T extends string, TPrefix extends string> = T extends `${TPrefix}${infer _}`
  ? true
  : false;

export type HasPostfix<
  T extends string,
  TPostfix extends string
> = T extends `${infer _}${TPostfix}` ? true : false;

export type WithOrWithoutPrefix<
  K extends string,
  TPrefix extends string,
  TKey extends string = K
> = K extends `${TPrefix}${infer P}`
  ? IsMemberOfUnion<P, TKey> extends true
    ? `${TPrefix}${P}`
    : P
  : K;

export type OptionalExceptFor<T extends object, K extends keyof T> = O.Optional<T, keyof T> &
  Required<Pick<T, K>>;

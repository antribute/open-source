import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import { upperFirst } from 'lodash-es';
import type {
  CamelCase as _CamelCase,
  DelimiterCase as _DelimiterCase,
  KebabCase as _KebabCase,
  PascalCase as _PascalCase,
  ScreamingSnakeCase as _ScreamingSnakeCase,
  SnakeCase as _SnakeCase,
} from 'type-fest';

export type StringCase = keyof IStringCase<string>;

export interface IStringCase<T> {
  param: ParamCase<T>;
  camel: CamelCase<T>;
  constant: ConstantCase<T>;
  path: PathCase<T>;
  dot: DotCase<T>;
  pascal: PascalCase<T>;
  snake: SnakeCase<T>;
  capital: CapitalCase;
  capitalize: Capitalize<Extract<T, string>>;
  header: HeaderCase;
  noCase: NoCase;
  sentence: SentenceCase;
}

const stringCaseFns = {
  param: paramCase,
  capital: capitalCase,
  capitalize: upperFirst,
  camel: camelCase,
  dot: dotCase,
  header: headerCase,
  noCase,
  path: pathCase,
  constant: constantCase,
  sentence: sentenceCase,
  snake: snakeCase,
  pascal: pascalCase,
} satisfies Record<StringCase, (v: string) => string>;

export type CasedString<T extends string, TCase extends StringCase> = IStringCase<T>[TCase];

/**
 *  Camel case
 *  Transform into a string with the separator denoted by the next word capitalized.
 *  @example "Test String"
 */
type CamelCase<T> = _CamelCase<T>;

/**
 *  Snake case
 *  Transform into a lower case string with underscores between words.
 *  @example "Test string"
 */
type SnakeCase<T> = _SnakeCase<T>;

/**
 *  Constant case
 *  Transform into upper case string with an underscore between words.
 *  @example "TEST_STRING"
 */
type ConstantCase<T> = _ScreamingSnakeCase<T>;

/**
 *  Dot case
 *  Transform into a lower case string with a period between words.
 *  @example "test.string"
 */
type DotCase<T> = _DelimiterCase<T, '.'>;

/**
 *  Param case (Kebab case)
 *  Transform into a lower cased string with dashes between words.
 *  @example "test-string"
 */
type ParamCase<T> = _KebabCase<T>;

/**
 *  Pascal case
 *  Transform into a string of capitalized words without separators.
 *  @example "TestString"
 */
type PascalCase<T> = _PascalCase<T>;

/**
 *  Path case
 *  Transform into a lower case string with slashes between words.
 *  @example "test/string"
 */
type PathCase<T> = _DelimiterCase<T, '/'>;

/**
 *  Header case
 *  Transform into a dash separated string of capitalized words.
 *  @example "Test-String"
 */
type HeaderCase = string;

/**
 *  Sentence case
 *  Transform into a lower case with spaces between words, then capitalize the string.
 *  @example "Test string"
 */
type SentenceCase = string;

/**
 *  Capital case
 *  Tansform into a space separated string with each word capitalized.
 *  @example "Test String"
 */
type CapitalCase = string;

/**
 *  No case
 *  Transform into a lower cased string with spaces between words.
 *  @example "test string"
 */
type NoCase = string;

export function changeCase<
  TStringInput extends string | undefined | null,
  TStringCase extends StringCase,
  TReturn extends TStringInput extends string ? CasedString<TStringInput, TStringCase> : undefined
>(str: TStringInput, stringCase: TStringCase): TReturn {
  if (typeof str !== 'string') {
    return undefined as TReturn;
  }

  const caseFn = stringCaseFns[stringCase];

  return caseFn(str) as TReturn;
}

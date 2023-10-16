import type { PrecompiledDefaults } from 'arktype/dist/types/scopes/ark';
import type { Join } from 'type-fest';

export type ArktypeKeyword = Extract<keyof PrecompiledDefaults, string>;

type AddQuotes<T extends readonly string[]> = { [K in keyof T]: `"${T[K]}"` };

type RemoveReadonly<T> = {
  -readonly [K in keyof T]: T[K];
};

type ArktypeUnionDefinition<T extends readonly string[]> = Join<
  AddQuotes<RemoveReadonly<T>>,
  ' | '
>;

type EnumName = `${Capitalize<string>}Enum`;

function arktypeUnionDefinition<TPossibleValues extends readonly string[] | string[]>(
  possibleValues: TPossibleValues
) {
  return possibleValues.map((e) => `"${e}"`).join(' | ') as ArktypeUnionDefinition<TPossibleValues>;
}

export function makeEnum<TName extends EnumName, const TPossibleValues extends readonly string[]>(
  name: TName,
  possibleValues: TPossibleValues
): {
  name: TName;
  arktypeDefinition: ArktypeUnionDefinition<TPossibleValues>;
  possibleValues: TPossibleValues;
  enum: <T extends TPossibleValues[number]>(key: T) => T;
} {
  return {
    name,
    enum: (key) => key,
    possibleValues,
    arktypeDefinition: arktypeUnionDefinition(possibleValues),
  };
}

export function insertBetween<T>(
  arr: T[],
  delimeter: unknown,
  transformElement?: (e: T) => unknown
) {
  return arr.flatMap((e, index, arr) => {
    const element = transformElement ? transformElement(e) : e;

    if (index !== arr.length - 1) {
      return [element, delimeter];
    }
    return [element];
  });
}

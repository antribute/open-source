import { isNaN, isNumber } from 'lodash-es';

interface ParsedValue {
  value: number;
  unit: string | null;
}

export const parseUnitValue = (str: string): ParsedValue => {
  const match = str.match(/^(\d+(?:\.\d+)?)(\D*)$/);

  if (!match) return { value: Number.NaN, unit: null };

  const [match1 = '', match2] = match;

  const value = Number.parseFloat(match1);
  const isNumeric = isNumber(value) && !isNaN(value);

  return { value, unit: match2 || isNumeric ? 'px' : null };
};

export function parseNumericValue(str: string) {
  const match = str.match(/^(\d+(?:\.\d+)?)(\D*)$/);

  const matchValue = match?.[1];

  if (!match || !matchValue) return null;

  return Number.parseFloat(matchValue);
}

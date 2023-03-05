import { hexRgb } from './hexToRgb';

export type CssColorVariable<T extends string = string> = `--color-${T}`;
export type CssAlphaVariable<T extends string = string> = `--alpha-${T}`;

export function getCssColorVariable<T extends string>(str: T): CssColorVariable<T> {
  return `--color-${str}`;
}

export function getCssAlphaVariable<T extends string>(str: T): CssAlphaVariable<T> {
  return `--alpha-${str}`;
}

export function getCssVariableValue<T extends string>(cssVariable: T, alphaCssVariable?: string) {
  if (alphaCssVariable) {
    return `rgb(var(${cssVariable}) / var(${alphaCssVariable}))`;
  }

  return `rgb(var(${cssVariable}) / <alpha-value>)`;
}

export interface CssVariableRgbaData {
  rgb: string;
  alpha: number;
}
export function getCssVariableRgb(hex: string): CssVariableRgbaData {
  const { red, green, blue, alpha } = hexRgb(hex);
  return { rgb: `${red} ${green} ${blue}`, alpha };
}

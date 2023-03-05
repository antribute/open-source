/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-bitwise */
// import { hexAlphaCodes } from '../colors.constants';
// import { objectMap } from './objectMap';

// export function hexToRgba(
//   hex: string
// ): { red: number; green: number; blue: number; alpha?: number } | null {
//   const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

//   if (!match) {
//     return null;
//   }

//   const [r, g, b, a] = [...match, getHexAlpha(hex)];

//   const [red, green, blue, alpha] = [r, g, b, a].map((c) => (c ? parseInt(c, 16) : undefined)) as [
//     number,
//     number,
//     number,
//     number | undefined
//   ];

//   return { red, green, blue, alpha };
// }

// function getHexAlpha(hex: string) {
//   if (hex.length !== 9) return undefined;
//   const hexAlphaCode = hex.slice(-2);
//   const inverted = objectMap<string, string>(hexAlphaCodes, (k, v) => [v, k]);
//   return inverted[hexAlphaCode as keyof typeof inverted];
// }

const hexCharacters = 'a-f\\d';
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');

export interface Options {
  /**
	Set the alpha of the color.

	This overrides any existing alpha component in the Hex color string. For example, the `99` in `#22222299`.

	The number must be in the range 0 to 1.
	*/
  readonly alpha?: number;
}

export interface RgbaObject {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export function hexRgb(hex: string, options: Options = {}) {
  if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
    throw new TypeError('Expected a valid hex string');
  }

  hex = hex.replace(/^#/, '');
  let alphaFromHex = 1;

  if (hex.length === 8) {
    alphaFromHex = Number.parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }

  if (hex.length === 4) {
    alphaFromHex = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }

  if (hex.length === 3) {
    hex = hex[0]! + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  const alpha = typeof options.alpha === 'number' ? options.alpha : alphaFromHex;

  return { red, green, blue, alpha };
}

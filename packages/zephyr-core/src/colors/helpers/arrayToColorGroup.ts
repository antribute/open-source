// eslint-disable-next-line import/no-extraneous-dependencies
import { ColorScaleKey, colorScaleKeys } from '../colors.constants';
import { ColorGroupArray } from '../colors.types';

export function arrayToColorGroup<T extends ColorGroupArray>(colorArr: T) {
  const entries = colorArr.map(
    (color, index) => [colorScaleKeys[index]!, color] as [ColorScaleKey, string]
  );

  return Object.fromEntries(entries) as Record<ColorScaleKey, string>;
}

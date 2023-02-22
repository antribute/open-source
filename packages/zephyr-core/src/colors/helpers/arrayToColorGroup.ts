// eslint-disable-next-line import/no-extraneous-dependencies
import { ColorScaleKey, colorScaleKeys } from '../colors.constants';
import { ColorGroup, ColorGroupArray } from '../colors.types';

export function arrayToColorGroup(colorArr: ColorGroupArray): ColorGroup {
  const entries = colorArr.map(
    (color, index) => [colorScaleKeys[index]!, color] as [ColorScaleKey, string]
  );

  return Object.fromEntries(entries) as Record<ColorScaleKey, string>;
}

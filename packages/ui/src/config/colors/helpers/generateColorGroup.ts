import type { ColorGroup, ColorPropKey } from '../colors.types';

export function generateColorGroup<TColorGroup extends ColorGroup>(colorGroup: TColorGroup) {
  return <TProps extends Record<ColorPropKey, keyof TColorGroup>>(props: TProps) => {
    const resolvedColorEntries = Object.entries(props).map(([k, v]) => {
      const val = colorGroup[v as keyof typeof colorGroup];
      return [k, val];
    });

    return {
      ...(Object.fromEntries(resolvedColorEntries) as Record<keyof TProps, string>),
      ...colorGroup,
    };
  };
}

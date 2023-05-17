import { ColorSchemeName } from 'config';
import { isClientSide } from 'utils/environment-utils';

export function getNearestColorSchemeAttribute(
  element?: HTMLElement | null,
  fallback: ColorSchemeName = 'default'
): ColorSchemeName {
  if (!isClientSide() || !element) return fallback;

  const nearestScheme = element
    .closest('[data-color-scheme]')
    ?.getAttribute('data-color-scheme') as ColorSchemeName | undefined;

  return nearestScheme ?? fallback;
}

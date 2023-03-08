import { GenericColorSchemeConfig } from '../color-scheme-config.types';
import { inverseScheme } from './inverse-scheme';
import { neutralScheme } from './neutral-scheme';
import { surfaceScheme } from './surface-scheme';

export const schemes = {
  default: surfaceScheme.surface,
  'dark/default': surfaceScheme['surface-dark'],
  ...inverseScheme,
  ...neutralScheme,
  ...surfaceScheme,
} satisfies GenericColorSchemeConfig;

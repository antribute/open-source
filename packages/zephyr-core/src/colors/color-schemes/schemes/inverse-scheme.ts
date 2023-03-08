import { GenericColorSchemeConfig } from '../color-scheme-config.types';
import { surfaceScheme } from './surface-scheme';

export const inverseScheme = {
  inverse: surfaceScheme['dark/surface'],
  'inverse-light': surfaceScheme['dark/surface-light'],
  'inverse-dark': surfaceScheme['dark/surface-dark'],
  'dark/inverse': surfaceScheme.surface,
  'dark/inverse-light': surfaceScheme['surface-light'],
  'dark/inverse-dark': surfaceScheme['surface-dark'],
} satisfies Partial<GenericColorSchemeConfig>;

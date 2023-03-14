import surface from './surface';
import surface_darkmode from './surface.darkmode';
import surfaceLight from './surface-light';
import surfaceLight_darkmode from './surface-light.darkmode';
import surfaceDark from './surface-dark';
import surfaceDark_darkmode from './surface-dark.darkmode';

export default {
  inverse: surface_darkmode['dark/surface'],
  'inverse-light': surfaceLight_darkmode['dark/surface-light'],
  'inverse-dark': surfaceDark_darkmode['dark/surface-dark'],

  'dark/inverse': surface.surface,
  'dark/inverse-light': surfaceLight['surface-light'],
  'dark/inverse-dark': surfaceDark['surface-dark'],
} as const;

import surface from './surface';
import surface_darkmode from './surface.darkmode';
import surfaceLight from './surface-light';
import surfaceLight_darkmode from './surface-light.darkmode';
import surfaceDark from './surface-dark';
import surfaceDark_darkmode from './surface-dark.darkmode';
import { defineColorScheme } from '../color-schemes.helpers';

const inverseColorSchemes = [
  defineColorScheme({ ...surface_darkmode, name: 'inverse' }),
  defineColorScheme({ ...surfaceLight_darkmode, name: 'inverse-light' }),
  defineColorScheme({ ...surfaceDark_darkmode, name: 'inverse-dark' }),

  defineColorScheme({ ...surface, name: 'dark/inverse' }),
  defineColorScheme({ ...surfaceLight, name: 'dark/inverse-light' }),
  defineColorScheme({ ...surfaceDark, name: 'dark/inverse-dark' }),
];

export default inverseColorSchemes;

import surface from './surface';
import surface_darkmode from './surface.darkmode';
import surfaceLight from './surface-light';
import surfaceLight_darkmode from './surface-light.darkmode';
import surfaceDark from './surface-dark';
import surfaceDark_darkmode from './surface-dark.darkmode';
import { defineColorScheme } from '../color-schemes.helpers';

const inverseColorSchemes = [
  defineColorScheme({
    name: 'inverse',
    extend: surface_darkmode,
  }),
  defineColorScheme({
    name: 'inverse-light',
    extend: surfaceLight_darkmode,
  }),
  defineColorScheme({
    name: 'inverse-dark',
    extend: surfaceDark_darkmode,
  }),

  defineColorScheme({
    name: 'dark/inverse',
    extend: surface,
  }),
  defineColorScheme({
    name: 'dark/inverse-light',
    extend: surfaceLight,
  }),
  defineColorScheme({
    name: 'dark/inverse-dark',
    extend: surfaceDark,
  }),
];

export default inverseColorSchemes;

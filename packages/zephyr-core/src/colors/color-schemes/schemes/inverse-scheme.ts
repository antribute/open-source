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
    colorMode: 'dark',
    extend: surface_darkmode,
  }),
  defineColorScheme({
    name: 'inverse-light',
    colorMode: 'dark',
    extend: surfaceLight_darkmode,
  }),
  defineColorScheme({
    name: 'inverse-dark',
    colorMode: 'dark',
    extend: surfaceDark_darkmode,
  }),

  defineColorScheme({
    name: 'dark/inverse',
    colorMode: 'light',
    extend: surface,
  }),
  defineColorScheme({
    name: 'dark/inverse-light',
    colorMode: 'light',
    extend: surfaceLight,
  }),
  defineColorScheme({
    name: 'dark/inverse-dark',
    colorMode: 'light',
    extend: surfaceDark,
  }),
];

export default inverseColorSchemes;

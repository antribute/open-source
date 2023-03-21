import danger from './danger';
import neutral from './neutral';
import neutralDark from './neutral-dark';
import neutralLight from './neutral-light';
import surface from './surface';
import surface_darkmode from './surface.darkmode';
import surfaceLight from './surface-light';
import surfaceLight_darkmode from './surface-light.darkmode';
import surfaceDark from './surface-dark';
import surfaceDark_darkmode from './surface-dark.darkmode';
import defaultScheme from './default';
import defaultDarkScheme from './default.darkmode';
import inverseColorSchemes from './inverse-scheme';

import { ResolvedColorSchemeConfig } from '../color-scheme-config.types';

export const colorSchemeConfigs = [
  defaultScheme,
  defaultDarkScheme,
  danger,
  neutral,
  neutralDark,
  neutralLight,
  surface,
  surfaceLight,
  surfaceDark,
  surface_darkmode,
  surfaceLight_darkmode,
  surfaceDark_darkmode,
  ...inverseColorSchemes,
] satisfies ResolvedColorSchemeConfig[];

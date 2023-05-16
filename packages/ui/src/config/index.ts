export type { ColorSchemeName } from './colors/color-schemes';

export {
  colorSchemeNames,
  mainColorSchemeNames,
  appStateColorSchemeNames,
} from './colors/color-schemes';

export { screens } from './screens';

export type { DataAttributes } from './data-attributes';

export { getDataAttributes, dataAttributes } from './data-attributes';

export interface ClassName {
  root: string;
  [componentName: string]: string;
}

export const testClassName: ClassName = {
  root: 'bg-neutral',
};

export * from './colors/colors';
export * from './colors/colors.types';

export type { TailwindConfig, TailwindColorKey } from './tailwindConfig';

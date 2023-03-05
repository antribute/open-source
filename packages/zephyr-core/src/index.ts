export type { ColorSchemeName } from './colors/color-schemes';

export { colorSchemeNames } from './colors/color-schemes';
export interface ClassName {
  root: string;
  [componentName: string]: string;
}

export const testClassName: ClassName = {
  root: 'bg-neutral',
};

export * from './colors/colors';

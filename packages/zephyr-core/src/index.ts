export interface ClassName {
  root: string;
  [componentName: string]: string;
}

export const testClassName: ClassName = {
  root: 'bg-primary',
};

export * from './colors';

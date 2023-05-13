export interface BoxShadowOptions {
  inset?: boolean;
  offsetX?: string | number;
  offsetY?: string | number;
  blurRadius?: string | number;
  spreadRadius?: string | number;
  color?: string;
}

export type BuildBoxShadowOptions =
  | BoxShadowOptions
  | (BoxShadowOptions | false | undefined | null)[];

export function buildBoxShadow(options: BuildBoxShadowOptions) {
  const opts = Array.isArray(options) ? (options.filter(Boolean) as BoxShadowOptions[]) : [options];

  return opts
    .map(
      ({
        inset,
        offsetX = 0,
        offsetY = 0,
        blurRadius = 0,
        spreadRadius = 0,
        color = 'rgb(0 0 0 / 0.1)',
      }) => {
        return `${
          inset ? 'inset' : ''
        } ${offsetX} ${offsetY} ${blurRadius} ${spreadRadius} ${color}`;
      }
    )
    .join(', ');
}

import type { BoxShadowOptions } from './buildBoxShadow';
import { buildBoxShadow } from './buildBoxShadow';

export function shadowBorder(options: BoxShadowOptions[]) {
  const defaultColor = 'rgb(var(--color-highlight-subtle) / var(--alpha-highlight-subtle))';

  const boxShadowOptions = options.map((o) => {
    return { inset: true, color: `var(--shadow-color,${defaultColor})`, ...o };
  });
  return buildBoxShadow(boxShadowOptions);
}

import plugin from 'tailwindcss/plugin';
import { colorSchemeCssVariableClasses } from '../colors/color-schemes';

export function multiThemePlugin() {
  return plugin(({ addBase, theme }) => {
    addBase({
      html: {
        color: theme('colors.content'),
        backgroundColor: theme('colors.base'),
      },
      h1: { color: theme('colors.content.strong') },
      h2: { color: theme('colors.content.strong') },
      h3: { color: theme('colors.content.strong') },
      h4: { color: theme('colors.content.strong') },
      h5: { color: theme('colors.content.strong') },
      h6: { color: theme('colors.content.strong') },
      p: { color: theme('colors.content.moderate') },
      strong: { color: theme('colors.content.strong') },
      ...colorSchemeCssVariableClasses,
    });
  });
}

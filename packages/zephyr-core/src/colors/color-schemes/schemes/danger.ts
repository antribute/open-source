import { colorPalette } from '../../colors';
import { generateHexAlphaColorGroup } from '../../helpers/generateHexAlphaColorGroup';
import { defineColorScheme } from '../color-schemes.helpers';

const dangerContent = generateHexAlphaColorGroup(colorPalette['palette-danger']['700'], undefined, {
  prefix: 'content',
});

const dangerScheme = defineColorScheme({
  name: 'danger',
  colorMode: 'dark',
  scheme: {
    primary: colorPalette['palette-danger']['100'],
    'primary-light': colorPalette['palette-danger']['50'],
    'primary-soft': colorPalette['palette-danger']['200'],
    'primary-dark': colorPalette['palette-danger']['50'],
    'primary-content': colorPalette['palette-danger'].DEFAULT,

    secondary: colorPalette['palette-various-rose']['800'],
    'secondary-dark': colorPalette['palette-various-rose']['900'],
    'secondary-light': colorPalette['palette-various-rose']['700'],
    'secondary-soft': colorPalette['palette-various-rose']['700'],
    'secondary-content': colorPalette['palette-content'].intense,

    surface: colorPalette['palette-danger']['500'],
    'surface-soft': colorPalette['palette-danger']['400'],
    'surface-light': colorPalette['palette-danger']['300'],
    'surface-dark': colorPalette['palette-danger']['600'],

    // ...dangerContent,
  },
});

export default dangerScheme;

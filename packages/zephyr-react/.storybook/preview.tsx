import React, { useEffect } from 'react';
import '@antribute/zephyr-core/zephyr-core.css';
import { API_Layout, GlobalTypes } from '@storybook/types';
import type { Decorator } from '@storybook/react';
import { colorPalette } from '@antribute/zephyr-core';
// .storybook/preview.js

import { useDarkMode, DARK_MODE, LIGHT_MODE, DEFAULT_THEME } from '../src/hooks/useIsDarkMode';

export const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: 'paintbrush',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: LIGHT_MODE, title: 'Light', left: '🌞' },
        { value: DARK_MODE, title: 'Dark', left: '🌛' },
      ],
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

type Parameters = Record<string, any> & {
  options: Partial<API_Layout>;
};

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    showPanel: false,
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
    values: [
      { name: 'light', value: colorPalette['palette-base'].DEFAULT },
      { name: 'dark', value: colorPalette['palette-base'].inverse },
    ],
  },
};

export const withTailwindTheme = (Story, context) => {
  const { theme } = context.globals;

  console.log('THEME', theme);

  const { setDarkMode } = useDarkMode();
  useEffect(() => {
    if (theme === DARK_MODE) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [theme]);

  return <Story />;
};

// const withThemeProvider: Decorator = (Story, context) => {
//   const { theme } = context.globals;

//   const isDarkMode = theme === DARK_MODE;

//   useEffect(() => {
//     const htmlTag = document.documentElement;

//     // Set the "data-mode" attribute on the iFrame html tag
//     htmlTag.setAttribute('data-mode', theme || LIGHT_MODE);
//   }, [theme]);

//   return (
//     <div
//       id="custom-root"
//       style={{
//         height: '100%',
//         minHeight: '100vh',
//         padding: '10px',
//         background: isDarkMode
//           ? colorPalette['palette-base'].inverse
//           : colorPalette['palette-base'].DEFAULT,
//       }}
//     >
//       <Story {...context} />
//     </div>
//   );
// };

export const decorators: Decorator[] = [withTailwindTheme];

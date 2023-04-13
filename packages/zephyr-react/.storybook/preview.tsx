import '@antribute/zephyr-core/zephyr-core.css';

import React, { useEffect } from 'react';
import type { API_Layout, GlobalTypes } from '@storybook/types';
import type { DecoratorFn } from '@storybook/react';
import { colorPalette } from '@antribute/zephyr-core';
import { useDarkMode } from '../src/hooks/useDarkMode';
import { LIGHT_MODE, DARK_MODE, DEFAULT_THEME } from '../src/constants/theme';

export const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: DEFAULT_THEME,
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: LIGHT_MODE, title: 'Light', left: '🌞' },
        { value: DARK_MODE, title: 'Dark', left: '🌛' },
      ],
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

export const withTailwindTheme: DecoratorFn = (Story, context) => {
  const { theme } = context.globals;

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

export const decorators: DecoratorFn[] = [withTailwindTheme];

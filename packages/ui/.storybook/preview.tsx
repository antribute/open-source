import '../antribute.css';

import React, { useEffect } from 'react';
import type { API_Layout, GlobalTypes } from '@storybook/types';
import type { Decorator, Preview } from '@storybook/react';
import { colorPalette } from '../src/config';
import { useDarkMode } from '../src/hooks/useDarkMode';
import { DARK_MODE, DEFAULT_THEME, LIGHT_MODE } from '../src/constants/theme';
import { AntributeUiProvider } from '../src/components/AntributeUiProvider';
export const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
  },
};

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
      { name: 'light', value: colorPalette['palette-base'] },
      { name: 'dark', value: colorPalette['palette-base'] },
    ],
  },
};

export const withProvider: Decorator = (Story, context) => {
  const { theme } = context.globals;

  const { setDarkMode } = useDarkMode();
  useEffect(() => {
    if (theme === DARK_MODE) {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [theme]);

  return (
    <AntributeUiProvider>
      <Story />
    </AntributeUiProvider>
  );
};

export const decorators: Decorator[] = [withProvider];

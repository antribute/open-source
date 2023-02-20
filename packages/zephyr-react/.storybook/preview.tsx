import React, { useEffect } from 'react';
import '@antribute/zephyr-core/zephyr-core.css';
import { API_Layout, GlobalTypes } from '@storybook/types';
import type { Decorator } from '@storybook/react';
import { colors } from '@antribute/zephyr-core';

const LIGHT_MODE = 'light';
const DARK_MODE = 'dark';

export const globalTypes: GlobalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: DARK_MODE,
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: [LIGHT_MODE, DARK_MODE],
      // Property that specifies if the name of the item will be displayed
      showName: true,
      // Change title based on selected value
      dynamicTitle: true,
    },
  },
};

type Parameters = Record<string, any> & {
  options: Partial<API_Layout>;
};

export const parameters: Parameters = {
  layout: 'fullScreen',
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
      { name: 'light', value: colors.base.DEFAULT },
      { name: 'dark', value: colors.base.inverse },
    ],
  },
};

const withThemeProvider: Decorator = (Story, context) => {
  const { theme } = context.globals;

  const isDarkMode = theme === DARK_MODE;

  useEffect(() => {
    const htmlTag = document.documentElement;

    // Set the "data-mode" attribute on the iFrame html tag
    htmlTag.setAttribute('data-mode', theme || LIGHT_MODE);
  }, [theme]);

  return (
    <div
      id="custom-root"
      style={{
        height: '100%',
        minHeight: '100vh',
        padding: '10px',
        background: isDarkMode ? colors.base.inverse : colors.base.DEFAULT,
      }}
    >
      <Story {...context} />
    </div>
  );
};

export const decorators: Decorator[] = [withThemeProvider];

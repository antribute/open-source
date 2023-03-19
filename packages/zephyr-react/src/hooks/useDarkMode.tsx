'use client';

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { DARK_MODE, LIGHT_MODE, DEFAULT_THEME } from 'constants/theme';
import { useState, useEffect, useMemo } from 'react';

const isClientSide = () => typeof window !== 'undefined';

const getInitialIsDarkMode = () => {
  if (!isClientSide()) return DEFAULT_THEME === DARK_MODE;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('color-theme');
  return savedTheme === DARK_MODE || (!savedTheme && prefersDark);
};

export const useDarkMode = () => {
  const initialIsDarkMode = useMemo(() => {
    return getInitialIsDarkMode();
  }, []);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialIsDarkMode);

  function setDarkMode(enabled: boolean) {
    const htmlTag = document.documentElement;

    if (enabled) {
      htmlTag.classList.add(DARK_MODE);
      htmlTag.setAttribute('data-mode', DARK_MODE);
      localStorage.setItem('color-theme', DARK_MODE);
    } else {
      htmlTag.classList.remove(DARK_MODE);
      htmlTag.removeAttribute('data-mode');
      localStorage.setItem('color-theme', LIGHT_MODE);
    }

    setIsDarkMode(enabled);
  }

  const toggleDarkMode = (): void => {
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const mode = getInitialIsDarkMode();
    setDarkMode(mode);
  }, []);

  return { isDarkMode, setDarkMode, toggleDarkMode };
};

export function useIsDarkMode() {
  const { isDarkMode } = useDarkMode();
  return isDarkMode;
}

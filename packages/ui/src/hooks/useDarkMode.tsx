import { DARK_MODE, DEFAULT_THEME, LIGHT_MODE } from 'constants/theme';
import { useLayoutEffect, useState } from 'react';
import { isClientSide } from 'utils/environment-utils';

const getInitialIsDarkMode = (fallback?: boolean) => {
  if (!isClientSide()) return DEFAULT_THEME === DARK_MODE;

  const savedTheme = localStorage.getItem('color-theme');

  if (!savedTheme) {
    return Boolean(fallback);
  }

  return savedTheme === DARK_MODE;
};

export const useDarkMode = () => {
  const initialIsDarkMode = getInitialIsDarkMode();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(initialIsDarkMode);

  function setDarkMode(enabled: boolean) {
    if (!isClientSide()) {
      return;
    }

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

  useLayoutEffect(() => {
    if (initialIsDarkMode !== isDarkMode) {
      setDarkMode(initialIsDarkMode);
    }
  }, [initialIsDarkMode, isDarkMode]);

  return { isDarkMode, setDarkMode, toggleDarkMode };
};

export function useIsDarkMode() {
  const { isDarkMode } = useDarkMode();
  return isDarkMode;
}

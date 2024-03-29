import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import type { IconButtonProps } from 'components/IconButton';
import { IconButton } from 'components/IconButton';
import { Tooltip } from 'components/Tooltip';
import { useDarkMode } from 'hooks/useDarkMode';

export const ThemeSwitcher = (props: IconButtonProps) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <Tooltip tooltip={isDarkMode ? 'Enable Light Mode' : 'Enable Dark Mode'}>
      <IconButton
        onClick={() => {
          toggleDarkMode();
        }}
        {...props}
        variant="glass"
        color="secondary"
        className="!bg-opacity-5"
      >
        {isDarkMode ? (
          <SunIcon className="fill-caution" />
        ) : (
          <MoonIcon className="fill-palette-neutral-light" />
        )}
      </IconButton>
    </Tooltip>
  );
};

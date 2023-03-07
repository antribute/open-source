import { Paper } from 'components/Paper';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import clsx from 'clsx';
import { expandVariant } from 'utils/classed';
import { colorSchemeNames } from '@antribute/zephyr-core';
import { Divider, DividerProps } from '.';

export const Default = () => {
  return (
    <div className="grid  grid-cols-3 gap-16">
      {colorSchemeNames.map((scheme, i) => (
        <Paper
          colorScheme={scheme}
          data-test="hello"
          className={clsx(
            'col-span-1 flex    w-full items-center justify-center gap-16 rounded p-16',
            ' bg-surface'
          )}
        >
          <button className="rounded bg-secondary p-8 hover:bg-secondary-dark ">Secondary</button>
          <button className="rounded bg-primary p-8 hover:bg-primary-dark ">Primary</button>
        </Paper>
      ))}
    </div>
  );
};

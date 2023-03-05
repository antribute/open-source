import { Paper } from 'components/Paper';
import { capitalCase } from 'change-case';
import { Button } from 'components/Button';
import clsx from 'clsx';
import { expandVariant } from 'utils/classed';
import { Divider, DividerProps } from '.';

export const Default = () => {
  return (
    <div className="grid  grid-cols-3 gap-16">
      {[
        'surface',
        'surface-light',
        'surface-dark',
        'neutral',
        'neutral-light',
        'neutral-dark',
        'inverse',
      ].map((scheme, i) => (
        <div
          data-color-scheme={scheme}
          data-test="hello"
          className={clsx(
            'col-span-1 flex   w-full items-center justify-center gap-16 rounded p-16',
            ' text-content- bg-surface'
          )}
        >
          <div className="text-content-weak">Text Strength</div>

          <button className="rounded p-8 text-content hover:bg-secondary-dark dark:bg-secondary ">
            Secondary
          </button>
          <button className="rounded bg-secondary p-8 text-content hover:bg-secondary-dark">
            Secondary
          </button>
          <button className="rounded bg-primary p-8 text-content hover:bg-primary-dark">
            Primary
          </button>
          <div
            className='flex gap-16 rounded bg-surface p-16 data-[color-scheme="inverse"]:!bg-danger'
            // data-mode="light"
          >
            <button className="rounded p-8 text-content hover:bg-secondary-dark dark:bg-secondary ">
              Secondary
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

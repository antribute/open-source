import { classed, mergeVariants } from 'utils/classed';
import type { SizeProp } from 'types/styles';
import { sizeVariants } from 'styles/size.variants';
import { clsx } from 'clsx';

type KBDSize = SizeProp<'base' | 'inline'>;

const KBDElement = classed(
  'kbd',
  'pointer-events-none px-8 inline-flex justify-center select-none items-center gap-2 rounded border border-highlight  bg-surface font-mono text-xs  font-medium text-content-weak opacity-100',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: mergeVariants([sizeVariants.textSize, sizeVariants.inlineHeight]),
    },
  }
);

export const KBD = ({
  size = 'md',
  keys,
  ...props
}: { keys: string[]; size?: KBDSize } & React.ComponentProps<typeof KBDElement>) => {
  const modifiers = ['⌘'];

  return (
    <KBDElement size={size} {...props}>
      {keys.map((key) => {
        return (
          <span className={clsx({ 'scale-90': modifiers.includes(key) })} key={key}>
            {key}
          </span>
        );
      })}
    </KBDElement>
  );
};

import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { sizeVariants } from 'styles/size.variants';
import { Classed, classed, mergeVariants } from 'utils/classed';

export type CheckboxElementVariants = Classed.VariantProps<typeof CheckboxElement>;

export type CheckboxElementProps = React.ComponentProps<typeof CheckboxElement>;

export const CheckboxElement = classed(
  CheckboxPrimitive.Root,
  // 'border-gray-light',
  'bg-neutral-50  dark:bg-surface-inverse',
  'radix-state-checked:bg-neutral dark:radix-state-checked:bg-neutral',
  'border border-boundary dark:border-boundary-inverse rounded-[0.185rem]',
  ' focus:ring-0 p-2',
  'text-content dark:text-content-inverse  radix-state-checked:text-content-inverse-intense',
  'focus:ring-offset-0',
  // 'focus:ring-offset-0 focus:ring-0 focus:ring-neutral-dark',
  {
    variants: {
      focusRing: {
        false: 'focus:ring-0',
        // true: 'focus:ring-2',
      },
      // size: mergeVariants([sizeVariants.width, sizeVariants.height]),
      size: {
        xs: 'h-16 w-16',
        sm: 'h-20 w-20',
        md: 'h-24 w-24',
        lg: 'h-28 w-28',
      },
    },
    defaultVariants: {
      size: 'md',
      focusRing: true,
    },
  }
);

export type BasicCheckboxProps = CheckboxElementProps;
export const BasicCheckbox = (props: BasicCheckboxProps) => {
  return (
    <CheckboxElement {...props}>
      <CheckboxPrimitive.Indicator>
        {/* <CheckIcon className="h-full w-full" /> */}
        <svg viewBox="0 0 12 10" className="h-full w-full fill-none stroke-current stroke-2">
          <polyline points="1.5 6 4.5 9 10.5 1" />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxElement>
  );
};

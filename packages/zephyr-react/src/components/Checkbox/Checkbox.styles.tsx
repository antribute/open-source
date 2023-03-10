import CheckIcon from '@heroicons/react/20/solid/CheckIcon';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { sizeVariants } from 'styles/size.variants';
import { Classed, classed, expandVariant, mergeVariants } from 'utils/classed';

export type CheckboxElementVariants = Classed.VariantProps<typeof CheckboxElement>;

export type CheckboxElementProps = React.ComponentProps<typeof CheckboxElement>;

export const CheckboxElement = classed(
  CheckboxPrimitive.Root,
  // 'border-gray-light',
  // 'bg-surface-soft',
  'radix-state-checked:bg-surface-light',
  'border border-boundary-tint',
  'rounded-[0.185rem]',
  'focus:ring-0 p-2',
  'text-content-intense',
  'bg-highlight',
  expandVariant('radix-state-checked:(bg-primary,text-primary-content,border-highlight)'),

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

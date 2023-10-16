import type {
  CheckboxProps as AriaCheckboxProps,
  CheckboxRenderProps,
} from 'react-aria-components';
import type { Classed, ToClassedVariants } from 'utils/classed';
import { classed } from 'utils/classed';
import { Checkbox as AriaCheckbox } from 'react-aria-components';

import { svgIcon } from 'components/Icon/SvgIconWrapper';
import { useToggleState } from 'react-stately';
import { generatePropPickerFn, objectMap } from 'utils';
import clsx from 'clsx';
import { Wrap } from 'components/Wrap';
import { Tooltip } from 'components/Tooltip';
import { forwardRef } from 'react';

type CheckboxElementVariantProps = Classed.VariantProps<typeof CheckboxElement>;

const sizePropVariants = {
  auto: {
    children: 'gap-8',
    checkbox: 'h-full w-full',
  },
  xs: {
    checkbox: 'h-16 w-16 p-1',
    children: 'leading-[16px] text-xs gap-4',
  },
  sm: {
    checkbox: 'h-20 w-20 p-[1.5px]',
    children: 'leading-[20px] text-sm gap-6',
  },
  md: {
    checkbox: 'h-22 w-22 p-2',
    children: 'leading-[22px] text-md gap-8',
  },
  lg: {
    checkbox: 'h-26 w-26 p-[3px]',
    children: 'leading-[26px] text-h4 gap-8',
  },
};

function getSizeVariant<T extends 'checkbox' | 'children'>(prop: T) {
  return objectMap(sizePropVariants, ({ key, value }) => {
    return [key, value[prop]];
  });
}

const CheckboxElement = classed(
  'div',
  'shrink-0',
  'cursor-pointer',
  'border border-boundary-weak',
  'rounded-[0.185rem]',
  'text-content-intense',
  'relative',
  'ml-2 mt-2',

  {
    defaultVariants: {
      size: 'md',
      focusVisibleRing: true,
    },

    variants: {
      size: getSizeVariant('checkbox'),

      isSelected: {
        true: 'bg-primary text-primary-content border-highlight',
        false: 'bg-highlight-subtle',
      },

      isDisabled: {
        true: 'text-content-moderate cursor-auto bg-surface-dark border-highlight-moderate',
      },
      isReadOnly: {
        true: '!cursor-not-allowed',
      },

      focusVisibleRing: {
        true: 'group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-content-intense',
      },
    } satisfies ToClassedVariants<CheckboxRenderProps>,

    compoundVariants: [
      {
        isReadOnly: true,
        isSelected: true,
        className: clsx('bg-primary noisy-surface-texture before:opacity-5 text-primary-soft'),
      },
      {
        isReadOnly: true,
        isSelected: false,
        class: 'bg-surface-dark',
      },
    ],
  }
);

const CheckboxContainerElement = classed(
  'div',
  'flex items-center gap-8',
  'cursor-pointer select-none',
  'relative',
  'grow',
  {
    defaultVariants: {
      size: 'md',
    },
    variants: {
      size: getSizeVariant('children'),
      isDisabled: {
        true: 'text-content-moderate',
      },
      isReadOnly: {
        true: 'cursor-auto text-content-moderate',
      },
    } satisfies ToClassedVariants<CheckboxRenderProps>,
  }
);

const CheckedSvg = svgIcon(
  <svg viewBox="0 0 12 10" className="fill-none stroke-current stroke-2">
    <polyline points="1.5 6 4.5 9 10.5 1" />
  </svg>,
  { autoSize: true, 'aria-hidden': true }
);

const IndertermidateSvg = svgIcon(
  <svg strokeWidth="3.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
  </svg>,
  { autoSize: true, 'aria-hidden': true }
);

export interface BasicCheckboxProps
  extends AriaCheckboxProps,
    Pick<CheckboxElementVariantProps, 'size' | 'focusVisibleRing'> {
  checkboxContainerClassName?: AriaCheckboxProps['className'];
  checkboxClassName?: AriaCheckboxProps['className'];
  pointerEventsNone?: boolean;
  label?: React.ReactNode;
  tooltip?: React.ReactNode;
  containerElement?: React.ComponentType<any>;
}

export const BasicCheckbox = forwardRef<HTMLInputElement, BasicCheckboxProps>(
  (
    {
      children,
      size,
      isSelected: isSelectedProp,
      checkboxContainerClassName,
      checkboxClassName,
      value,
      pointerEventsNone,
      label,
      tooltip,
      containerElement,
      ...props
    },
    forwardedRef
  ) => {
    /**
     * This was made into a controlled checkbox due to a bug in react-aria-components@1.0.0-alpha.3's
     * Checkbox component where checkbox isn't immediatley checked on click when focus is elsewhere.
     */
    const toggleState = useToggleState({
      isSelected: isSelectedProp,
    });

    const isSelected = toggleState.isSelected && !props.isIndeterminate;

    return (
      <AriaCheckbox
        {...props}
        onChange={(e) => {
          props.onChange?.(e);
        }}
        ref={forwardedRef}
        value={value}
        isSelected={isSelected}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            toggleState.toggle();
          }
          props.onKeyDown?.(e);
        }}
        className={clsx('group', { 'pointer-events-none': pointerEventsNone })}
      >
        {(renderFnProps) => {
          const { isSelected, isIndeterminate } = renderFnProps;

          const renderProps = { size, ...renderFnProps };

          return (
            <Wrap
              if={Boolean(tooltip)}
              wrap={(c) => {
                return (
                  <Tooltip.Root>
                    <Tooltip.Content side="right" align="center" size="sm">
                      {tooltip}
                    </Tooltip.Content>
                    <Tooltip.Trigger asChild>{c}</Tooltip.Trigger>
                  </Tooltip.Root>
                );
              }}
            >
              <CheckboxContainerElement
                as={containerElement as never}
                onClick={() => {
                  toggleState.toggle();
                }}
                className={renderPropsClassName({
                  className: checkboxContainerClassName,
                  renderProps,
                })}
                isReadOnly={renderProps.isReadOnly}
                isDisabled={renderProps.isDisabled}
              >
                <CheckboxElement
                  isSelected={renderProps.isSelected}
                  isReadOnly={renderProps.isReadOnly}
                  isDisabled={renderProps.isDisabled}
                  className={renderPropsClassName({ className: checkboxClassName, renderProps })}
                >
                  {isSelected && (
                    <>
                      {!isIndeterminate && (
                        <>
                          <CheckedSvg autoSize />
                        </>
                      )}
                      {isIndeterminate && <IndertermidateSvg autoSize />}
                    </>
                  )}
                </CheckboxElement>

                {label && <div> {label}</div>}

                {typeof children === 'function' ? children(renderProps) : children}
              </CheckboxContainerElement>
            </Wrap>
          );
        }}
      </AriaCheckbox>
    );
  }
);

export const pickCheckboxProps = generatePropPickerFn<BasicCheckboxProps>({
  children: '_pick_',
  label: '_pick_',
  tooltip: '_pick_',
  isRequired: '_pick_',
  size: '_pick_',
  slot: '_pick_',
  style: '_pick_',
  className: '_pick_',
  id: '_pick_',
  'aria-controls': '_pick_',
  'aria-describedby': '_pick_',
  'aria-details': '_pick_',
  'aria-errormessage': '_pick_',
  'aria-label': '_pick_',
  'aria-labelledby': '_pick_',
  onFocus: '_pick_',
  onBlur: '_pick_',
  onChange: '_pick_',
  onKeyDown: '_pick_',
  onKeyUp: '_pick_',
  autoFocus: '_pick_',
  name: '_pick_',
  value: '_pick_',
  excludeFromTabOrder: '_pick_',
  isDisabled: '_pick_',
  isReadOnly: '_pick_',
  validationState: '_pick_',
  onFocusChange: '_pick_',
  isIndeterminate: '_pick_',
  defaultSelected: '_pick_',
  isSelected: '_pick_',
  focusVisibleRing: '_pick_',
  checkboxClassName: '_pick_',
  checkboxContainerClassName: '_pick_',
  pointerEventsNone: '_pick_',
  containerElement: '_pick_',
});

function renderPropsClassName({
  className,
  renderProps,
}: {
  className?: AriaCheckboxProps['className'];
  renderProps: CheckboxRenderProps & { size: BasicCheckboxProps['size'] };
}) {
  return typeof className === 'function' ? className(renderProps) : className;
}

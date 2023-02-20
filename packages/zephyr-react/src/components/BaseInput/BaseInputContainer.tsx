import React, { useRef } from 'react';
import {
  BaseInputContainerElement,
  BaseInputIconSlotElement,
  BaseInputIconSlotElementVariantProps,
} from 'components/BaseInput/BaseInputContainer.styles';
import {
  InlineInputAddonType,
  InputAddonSlotProps,
  InputComponentProps,
  InputComponentState,
  InputComponentStateMessagePair,
} from 'types/input-component.types';
import { flattenDeep } from 'lodash-es';
import ExclamationCircleIcon from '@heroicons/react/20/solid/ExclamationCircleIcon';
import CheckCircleIcon from '@heroicons/react/20/solid/CheckCircleIcon';
import { mergeRefs } from 'react-merge-refs';
import { deriveClassed } from '@tw-classed/react';
import { Slot } from '@radix-ui/react-slot';
import { isReactNode } from 'utils/component-is-utils';
import { notEmpty } from 'utils/notEmpty';
import { PlaceholderElement } from 'components/BaseInput/BaseInput.styles';

function isAddonType(e: unknown): e is InlineInputAddonType {
  return Boolean(e && typeof e === 'object' && 'content' in e);
}
const getAddonList = (
  ...props: (React.ReactNode | InlineInputAddonType | (InlineInputAddonType | React.ReactNode)[])[]
): {
  addonList: InlineInputAddonType[];
  hasAddons: boolean;
} => {
  const addonList = flattenDeep(props)
    .map((e) => {
      return toAddonType(e);
    })
    .filter(notEmpty);

  return {
    addonList,
    hasAddons: addonList.length > 0,
  };
};

const getInputStateIcon = ({
  inputState,
  hide,
}: {
  inputState?: InputComponentState;
  hide?: boolean;
}) => {
  const common = {
    height: 20,
    width: 20,
  };

  if (hide) {
    return undefined;
  }

  if (inputState === 'error') {
    return <ExclamationCircleIcon className="text-danger" {...common} />;
  }

  if (inputState === 'success') {
    return <CheckCircleIcon className="text-positive" {...common} />;
  }

  return undefined;
};

type BaseInputIconProps = React.ComponentProps<typeof BaseInputIconSlotElement> &
  InlineInputAddonType;

const BaseInputIcon = deriveClassed<typeof BaseInputIconSlotElement, BaseInputIconProps>(
  ({ content, tabIndex, ...props }, ref) => {
    return (
      <PlaceholderElement className="flex h-20 w-20 items-center justify-center dark:text-content-inverse-weak">
        {typeof content !== 'object' ? (
          <> {content}</>
        ) : (
          <Slot
            tabIndex={tabIndex}
            {...props}
            ref={ref}
            onClick={(e) => !props.focusInputOnClick && e.stopPropagation()}
          >
            {content}
          </Slot>
        )}
      </PlaceholderElement>
    );
  }
);

export type BaseInputContainerProps = {
  focusElementOnClick?: boolean;
  children:
    | React.ReactNode
    | ((props: {
        // leadingIconWidth: (delta?: number) => number | undefined;
        // trailingIconWidth: (delta?: number) => number | undefined;
        ref: React.ForwardedRef<HTMLInputElement>;
      }) => React.ReactNode);
} & InputComponentProps &
  BaseInputIconSlotElementVariantProps &
  InputAddonSlotProps &
  Pick<InputComponentStateMessagePair, 'inputState'>;

const toAddonType = (e?: unknown): InlineInputAddonType | undefined => {
  if (!e) return undefined;

  if (isAddonType(e)) return e;

  if (isReactNode(e)) {
    return {
      focusInputOnClick: true,
      content: e,
    };
  }

  return undefined;
};

export const BaseInputContainer = deriveClassed<
  typeof BaseInputContainerElement,
  BaseInputContainerProps
>(
  (
    {
      size,
      width,
      children,
      leadingIcon,
      trailingIcon,
      className,
      inlineLeadingAddonSlot = [],
      inlineTrailingAddonSlot = [],
      focusElementOnClick = true,
      inputState,
      ...props
    },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement>();

    const ref = mergeRefs([inputRef, forwardedRef]);

    const { leading, trailing } = React.useMemo(() => {
      const { addonList: leading } = getAddonList(inlineLeadingAddonSlot, leadingIcon);

      const { addonList: trailing } = getAddonList(
        getInputStateIcon({ inputState }),
        trailingIcon,
        inlineTrailingAddonSlot
      );

      return { leading, trailing };
    }, [inlineLeadingAddonSlot, inlineTrailingAddonSlot, inputState, leadingIcon, trailingIcon]);

    return (
      <BaseInputContainerElement
        className={className}
        inputState={inputState}
        ref={forwardedRef}
        width={width}
        size={size}
        onClick={() => {
          if (focusElementOnClick && inputRef.current) {
            inputRef.current.focus();
          }
        }}
        {...props}
      >
        {leading.map((props, index) => (
          <BaseInputIcon {...props} key={index} />
        ))}

        {typeof children === 'function'
          ? children({
              ref,
            })
          : children}
        {trailing.map((props, index) => (
          <BaseInputIcon {...props} key={index} />
        ))}
      </BaseInputContainerElement>
    );
  }
);

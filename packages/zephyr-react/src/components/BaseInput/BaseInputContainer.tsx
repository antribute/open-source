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
import { twMerge } from 'tailwind-merge';
import { InvisibleCharacter } from 'components/InvisibleCharacter';
import { classed, expandVariant, mergeVariants } from 'utils/classed';
import clsx from 'clsx';
import { Spinner } from 'components/Spinner';
import { getRelativeSizeProp } from 'utils/getRelativeSizeProp';
import { sizeVariants } from 'styles/size.variants';

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

  return <CheckCircleIcon className="opacity-0" />;
};

type BaseInputIconProps = React.ComponentProps<typeof BaseInputIconSlotElement> &
  InlineInputAddonType;

const BaseInputIconElement = classed(
  PlaceholderElement,
  'shrink-0 flex h-20 items-center justify-center align-middle relative z-10',

  {
    variants: {
      size: mergeVariants([sizeVariants.inlineHeight, sizeVariants.textSize]),
    },
  }
);

const BaseInputIcon = deriveClassed<typeof BaseInputIconSlotElement, BaseInputIconProps>(
  ({ content, className, ...props }, ref) => {
    return (
      <BaseInputIconElement
        className={className}
        onClick={(e) => {
          if (props.focusInputOnClick === false) {
            e.stopPropagation();
          }
        }}
      >
        {typeof content !== 'object' ? (
          <> {content}</>
        ) : (
          <Slot {...props} ref={ref} className="h-full">
            {content}
          </Slot>
        )}
      </BaseInputIconElement>
    );
  }
);

export type BaseInputContainerProps = {
  placeholderShown?: boolean;
  focusElementOnClick?: boolean;
  children:
    | React.ReactNode
    | ((props: { ref: React.ForwardedRef<HTMLInputElement> }) => React.ReactNode);
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
      loading,
      ...props
    },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement>();

    const ref = mergeRefs([inputRef, forwardedRef]);

    const { leading, trailing } = React.useMemo(() => {
      const { addonList: leading } = getAddonList(inlineLeadingAddonSlot, leadingIcon);

      const placeholderAddon: InlineInputAddonType = {
        content: <InvisibleCharacter />,
        className: 'grow',
      };

      const { addonList: trailing } = getAddonList(
        placeholderAddon,
        getInputStateIcon({ inputState }),
        inlineTrailingAddonSlot,
        loading ? { content: <Spinner size={size} /> } : trailingIcon
      );

      return { leading, trailing };
    }, [
      inlineLeadingAddonSlot,
      inlineTrailingAddonSlot,
      inputState,
      leadingIcon,
      loading,
      size,
      trailingIcon,
    ]);

    return (
      <BaseInputContainerElement
        className={twMerge(className)}
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

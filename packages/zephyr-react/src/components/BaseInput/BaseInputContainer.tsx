import React, { createContext, useEffect, useMemo } from 'react';
import useDimensions from 'react-cool-dimensions';
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
import { atom, useAtom } from 'jotai';
import { filter, sortBy, sum, sumBy } from 'lodash-es';
import { SizeProp } from 'types/styles';
import { createCtx } from 'utils/createContext';
import { useImmer, ImmerHook } from 'use-immer';
import ExclamationCircleIcon from '@heroicons/react/20/solid/ExclamationCircleIcon';
import CheckCircleIcon from '@heroicons/react/20/solid/CheckCircleIcon';

export type BaseInputContainerProps = InputComponentProps & {
  fragment?: boolean;
  children: (props: {
    leadingIconWidth: (delta?: number) => number | undefined;
    trailingIconWidth: (delta?: number) => number | undefined;
  }) => React.ReactNode;
} & BaseInputIconSlotElementVariantProps &
  InputAddonSlotProps &
  Pick<InputComponentStateMessagePair, 'inputState'>;

function getTotalWidth(widthMap: Record<number, number>, { size }: { size: SizeProp }) {
  const values = Object.values(widthMap);
  return sum(values) + getIconGap({ size: size! }) * (values.length - 1) + getIconPadding({ size });
}

type InputContainerWidthImmerHook = ImmerHook<{
  leadingWidthMap: Record<string, number>;
  trailingWidthMap: Record<string, number>;
}>;

type BaseInputContainerContext = {
  inputContainderWidthImmerHook: InputContainerWidthImmerHook;
};

const { useContext: useBaseInputContainerContext, Provider: BaseInputContainerProvider } =
  createCtx<BaseInputContainerContext>();

const getIconGap = ({ size = 'md' }: { size?: SizeProp }) => {
  const gapMap: Record<SizeProp, number> = {
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
  };

  return gapMap[size];
};

const getIconPadding = ({ size = 'md' }: { size?: SizeProp }) => {
  const paddingMap: Record<SizeProp, number> = {
    xs: 6.5,
    sm: 6.5,
    md: 8.5,
    lg: 9.5,
  };

  return paddingMap[size];
};

const BaseInputIconSlot = (
  props: {
    children?: React.ReactNode;
    index: number;
    gap?: number;
    position: 'leading' | 'trailing';
  } & BaseInputIconSlotElementVariantProps
) => {
  const { children, position = 'leading', index, size = 'md', gap: gapProp } = props;

  const [inputContianerWidth, setInputContainerWidth] =
    useBaseInputContainerContext().inputContainderWidthImmerHook;

  const containerWidth =
    position === 'leading'
      ? inputContianerWidth.leadingWidthMap
      : inputContianerWidth.trailingWidthMap;

  const gap = gapProp ?? getIconGap({ size });

  const leadingWidthEntries = sortBy(Object.entries(containerWidth), ([key]) => key);

  const leadingWidthList = leadingWidthEntries.map(([key, width]) => {
    const idx = parseInt(key);

    return {
      idx,
      width,
    };
  });

  const offset = sumBy(
    leadingWidthList.filter(({ idx }) => idx < index),
    (e) => e.width
  );

  const { width, observe } = useDimensions({});

  useEffect(() => {
    if (position === 'leading') {
      setInputContainerWidth((draft) => {
        draft.leadingWidthMap[index] = width;
      });
    }
    if (position === 'trailing') {
      setInputContainerWidth((draft) => {
        draft.trailingWidthMap[index] = width;
      });
    }
  }, [width]);

  return (
    <BaseInputIconSlotElement
      {...props}
      ref={observe}
      style={{
        [position === 'trailing' ? 'right' : 'left']:
          offset + (gap * index + getIconPadding({ size })),
      }}
    >
      {children}
    </BaseInputIconSlotElement>
  );
};

const getAddonList = (
  ...props: Array<InlineInputAddonType | InlineInputAddonType[]>
): {
  addonList: InlineInputAddonType[];
  hasAddons: boolean;
} => {
  const addonList = props.flat().filter((e) => e.content);
  return {
    addonList,
    hasAddons: addonList.length > 0,
  };
};

const InputStateAddon = ({
  inputState,
  hide,
}: {
  inputState?: InputComponentState;
  hide?: boolean;
}) => {
  const props = {
    height: 20,
    width: 20,
  };

  if (hide) {
    return null;
  }

  if (inputState === 'error') {
    return <ExclamationCircleIcon className="text-danger" {...props} />;
  }

  if (inputState === 'success') {
    return <CheckCircleIcon className="text-positive" {...props} />;
  }

  return null;
};

export const BaseInputContainer = ({
  size = 'md',
  width = 'fixed',
  children,
  leadingIcon,
  trailingIcon,
  className,
  inlineLeadingAddonSlot = [],
  inlineTrailingAddonSlot = [],
  fragment,
  inputState,
}: BaseInputContainerProps) => {
  const { addonList: leading, hasAddons: hasLeading } = getAddonList(inlineLeadingAddonSlot, {
    content: leadingIcon,
  });
  const { addonList: trailing, hasAddons: hasTrailing } = getAddonList(
    {
      content: <InputStateAddon inputState={inputState!} />,
    },
    {
      content: trailingIcon,
    },
    inlineTrailingAddonSlot
  );

  const hasIcon = Boolean(hasLeading || hasTrailing);

  const Container = fragment
    ? React.Fragment
    : hasIcon
    ? BaseInputContainerElement
    : React.Fragment;

  const inputContainderWidthImmerHook = useImmer<{
    leadingWidthMap: Record<string, number>;
    trailingWidthMap: Record<string, number>;
  }>({ leadingWidthMap: {}, trailingWidthMap: {} });

  const [inputContainerWidth] = inputContainderWidthImmerHook;

  const { leadingWidth, trailingWidth } = {
    leadingWidth: getTotalWidth(inputContainerWidth.leadingWidthMap, { size }),
    trailingWidth: getTotalWidth(inputContainerWidth.trailingWidthMap, { size }),
  };

  console.log({ inputContainerWidth });

  return (
    <BaseInputContainerProvider value={{ inputContainderWidthImmerHook }}>
      <Container width={width} className={className}>
        {children({
          leadingIconWidth: (delta = 0) => (hasLeading ? leadingWidth + delta : undefined),
          trailingIconWidth: (delta = 0) => (hasTrailing ? trailingWidth + delta : undefined),
        })}

        {leading.map(({ content, ...props }, i) => (
          <BaseInputIconSlot index={i} key={i} position="leading" {...props} size={size}>
            {content}
          </BaseInputIconSlot>
        ))}

        {trailing.map(({ content, ...props }, i) => (
          <BaseInputIconSlot index={i} key={i} position="trailing" {...props} size={size}>
            {content}
          </BaseInputIconSlot>
        ))}
      </Container>
    </BaseInputContainerProvider>
  );
};

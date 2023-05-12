import { useClampText } from 'use-clamp-text';
import React, { useState, useMemo, ReactNode } from 'react';
import { onlyText } from 'react-children-utilities';
import { Tooltip } from 'components/Tooltip';
import { Wrap } from 'components/Wrap';
import { twMerge } from 'tailwind-merge';
import { classed } from 'utils/classed';
import clsx from 'clsx';
import { measureElement } from 'utils/measureElement';

export interface ClampTextProps extends Omit<UseClampTextProps, 'ellipsis' | 'trimmedChars'> {
  className?: string;
  children?: React.ReactNode;
  showMoreInTooltip?: boolean;
  clampedElementType?: 'text' | 'children';
  expandedElementType?: 'text' | 'children';
  renderClampedTexOnExpand?: boolean;
  showMoreInCollapisbleArea?: boolean;
  onExpandedChange?: (expanded: boolean) => void;

  tooltipProps?: {
    tooltipWidth?: number | string;
    maxTooltipWidth?: number | string;
    minTooltipWidth?: number | string;
  };
}

export const ClampText = ({
  className,
  children,
  maxLines = 2,
  debounceTime,
  charWidth,
  showMoreInCollapisbleArea: showMoreInCollapisbleAreaProp,
  showMoreInTooltip: showMoreInTooltipProp,
  clampedElementType = 'children',
  expandedElementType = 'children',
  onExpandedChange,
  expanded: expandedProp,
  tooltipProps,
}: ClampTextProps) => {
  const showMoreInTooltip = showMoreInTooltipProp;

  const showMoreInCollapisbleArea = showMoreInCollapisbleAreaProp ?? !showMoreInTooltip;

  const text = onlyText(children);

  const [expanded, setExpanded] = useState<boolean>(false);

  function expand(v?: boolean) {
    const enabled = v === undefined ? !expanded : v;
    setExpanded(enabled);
    onExpandedChange?.(enabled);
  }
  const [ref, { clampedText, noClamp, key }] = useClampText({
    text,
    ellipsis: 8,
    lines: maxLines,
    debounceTime,
    charWidth,
    expanded: expandedProp ?? expanded,
  });

  const isClamped = !noClamp;

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const renderClampedReactNode = !expanded && clampedElementType === 'children';

  const textElement = useMemo(() => {
    const clampedElement =
      expandedElementType === 'children'
        ? truncateReactChildren(children, clampedText.length)
        : clampedText;
    const expandedElement = expandedElementType === 'children' ? children : clampedText;

    return expanded ? expandedElement : clampedElement;
  }, [expanded, children, clampedText, clampedElementType, expandedElementType, maxLines]);

  return (
    <Wrap
      if={showMoreInTooltip}
      wrap={(c) => {
        const { maxTooltipWidth, tooltipWidth, minTooltipWidth } = tooltipProps ?? {};
        return (
          <Tooltip.Provider>
            <Tooltip.Root delayDuration={100} open={tooltipOpen} disableHoverableContent>
              <Tooltip.Trigger asChild>{c}</Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  colorScheme="inverse"
                  side="bottom"
                  className="shadow-md shadow-palette-black/50"
                  align="center"
                  selectNone={false}
                  onTooltipClick={() => {
                    setTooltipOpen(false);
                  }}
                  size="sm"
                  maxWidth={false}
                  style={{
                    width: tooltipWidth,
                    minWidth: minTooltipWidth,
                    maxWidth: maxTooltipWidth ?? measureElement(ref).width,
                  }}
                >
                  {text}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        );
      }}
    >
      <div ref={ref as never} key={key} className={twMerge(className, 'relative group')}>
        <span
          className={clsx({
            'mr-8': expanded,
            'opacity-100 relative ': renderClampedReactNode,
            'whitespace-nowrap': !expanded && maxLines === 1,
          })}
        >
          {textElement}
        </span>

        {expanded && <CollapseButton onClick={() => expand(false)}>Collapse</CollapseButton>}

        {isClamped && (
          <Wrap
            if={showMoreInTooltip}
            wrap={(c) => {
              return (
                <Tooltip.Provider>
                  <Tooltip.Root
                    delayDuration={150}
                    disableHoverableContent
                    onOpenChange={(open) => {
                      setTooltipOpen(open);
                    }}
                  >
                    <Tooltip.Trigger asChild>{c}</Tooltip.Trigger>
                    <Tooltip.PrimitiveContent
                      onPointerDownOutside={(e) => {
                        e.preventDefault();
                      }}
                    />
                  </Tooltip.Root>
                </Tooltip.Provider>
              );
            }}
          >
            <EllipsisButton
              clickable={showMoreInCollapisbleArea}
              onClick={() => {
                if (showMoreInCollapisbleArea) {
                  expand(true);
                }
              }}
            >
              ...
            </EllipsisButton>
          </Wrap>
        )}
      </div>
    </Wrap>
  );
};

const TruncationButtonElement = classed(
  'button',
  'm-0 p-0 [font-size:inherit] text-inerit inline',
  'relative before-absolute-content',
  'leading-sm',
  'cursor-pointer',
  {
    variants: {
      clickable: {
        false: 'cursor-default',
        true: 'cursor-pointer',
      },
      enterAnimation: {
        true: clsx(
          'opacity-0 ',
          'animate-fade-out ',
          'group-hover:animate-scale-in ',
          'group-hover:opacity-100 ',
          'group-hover:px-8 '
        ),
      },
    },
  }
);

const TruncationButtonBackgroundElement = classed(
  'span',
  'absolute -inset-y-2 -inset-x-4 rounded-sm z-0 transition-colors shrink-0',
  {
    variants: {
      rounded: {
        sm: 'rounded-sm',
        md: 'rounded',
      },
      border: {
        true: 'ring-1 ring-highlight-high',
      },
      backgroundHover: {
        true: 'hover:!bg-highlight-high',
      },
      backgroundVisible: {
        true: 'bg-highlight-subtle',
      },
      backgroundVisibleOnGroupHover: {
        true: 'group-hover:bg-highlight-subtle',
      },
    },
    defaultVariants: {
      backgroundVisible: true,
      backgroundHover: true,
    },
  }
);

const EllipsisButtonElement = classed(
  TruncationButtonElement,
  // 'mr-4',
  'group-hover:translate-x-6 transition-transform shrink-0 w-0'
);

const EllipsisButton = ({
  children,
  ...props
}: React.ComponentProps<typeof EllipsisButtonElement>) => {
  const clickable = Boolean(props.onClick);
  return (
    <EllipsisButtonElement clickable={clickable} {...props}>
      <span className="shrink-0 min-w-fit relative">
        <TruncationButtonBackgroundElement
          backgroundHover={clickable}
          backgroundVisible={false}
          backgroundVisibleOnGroupHover
          rounded="md"
        />
        {children}
      </span>
    </EllipsisButtonElement>
  );
};

const CollapseButtonElement = classed(TruncationButtonElement, 'scale-90');

const CollapseButton = ({
  children,
  ...props
}: React.ComponentProps<typeof CollapseButtonElement>) => {
  return (
    <CollapseButtonElement {...props}>
      {children}
      <TruncationButtonBackgroundElement backgroundHover backgroundVisible border rounded="sm" />
    </CollapseButtonElement>
  );
};

interface UseClampTextProps {
  /**
   * To control whether the string should be truncated or not
   */
  expanded?: boolean;

  /** Maximum number of visible lines  */
  maxLines?: number;

  /** A string displayed after the clamped text  or
   *  the number of characters to be trimmed off the clamped text.
   *  @default  2
   */
  ellipsis?: string;

  /** Time in milliseconds used for debounce. Default: 300 */
  debounceTime?: number;

  /** The average character width to be assumed for calculating clamped string length. */
  charWidth?: number;
}

// function truncateReactChildren(
//   children: ReactNode | ReactNode[],
//   maxLength: number,
//   fallback: ReactNode | ReactNode[]
// ): ReactNode | ReactNode[] {
//   try {
//     let currentLength = 0;

//     const truncateChildrenRecursively = (child: ReactNode): ReactNode | null => {
//       if (currentLength >= maxLength) {
//         return null;
//       }

//       if (typeof child === 'string' || typeof child === 'number') {
//         const remainingLength = maxLength - currentLength;
//         const truncatedText = child.toString().substring(0, remainingLength);
//         currentLength += truncatedText.length;
//         return truncatedText;
//       }

//       if (React.isValidElement(child) && child.props.children) {
//         const truncatedChildren = React.Children.map(
//           child.props.children,
//           truncateChildrenRecursively
//         );
//         return React.cloneElement(child, child.props, truncatedChildren);
//       }

//       return null;
//     };

//     return React.Children.map(children, truncateChildrenRecursively);
//   } catch {
//     return fallback;
//   }
// }

// function truncateReactChildren(
//   children: ReactNode | ReactNode[],
//   maxLength: number
// ): ReactNode | ReactNode[] {
//   let currentLength = 0;

//   const truncateChildrenRecursively = (child: ReactNode): ReactNode | null => {
//     if (currentLength >= maxLength) {
//       return null;
//     }

//     if (typeof child === 'string' || typeof child === 'number') {
//       const remainingLength = maxLength - currentLength;
//       const truncatedText = child.toString().substring(0, remainingLength);
//       currentLength += truncatedText.length;
//       return truncatedText;
//     }

//     if (React.isValidElement(child)) {
//       const childProps = child.props;
//       const renderChildren = childProps?.renderChildren;
//       const childrenToProcess = renderChildren ? renderChildren() : childProps.children;
//       const truncatedChildren = React.Children.toArray(childrenToProcess)
//         .map(truncateChildrenRecursively)
//         .filter((child) => child !== null);
//       return React.cloneElement(child, child.props, truncatedChildren);
//     }

//     return null;
//   };

//   const truncatedChildren = React.Children.toArray(children)
//     .map(truncateChildrenRecursively)
//     .filter((child) => child !== null);

//   return truncatedChildren;
// }

function truncateReactChildren(
  children: ReactNode | ReactNode[],
  maxLength: number
): ReactNode | ReactNode[] {
  let currentLength = 0;

  const truncateChildrenRecursively = (child: ReactNode): ReactNode | null => {
    if (currentLength >= maxLength) {
      return null;
    }

    if (typeof child === 'string' || typeof child === 'number') {
      const remainingLength = maxLength - currentLength;
      const truncatedText = child.toString().substring(0, remainingLength);
      currentLength += truncatedText.length;
      return truncatedText;
    }

    if (React.isValidElement(child)) {
      const childProps = child.props;
      const renderChildren = childProps?.renderChildren;
      const childrenToProcess = renderChildren ? renderChildren() : childProps.children;
      const truncatedChildren = React.Children.toArray(childrenToProcess)
        .map(truncateChildrenRecursively)
        .filter((child) => child !== null);
      return React.cloneElement(child, child.props, truncatedChildren);
    }

    return null;
  };

  const truncatedChildren = React.Children.toArray(children)
    .map(truncateChildrenRecursively)
    .filter((child) => child !== null);

  return truncatedChildren;
}

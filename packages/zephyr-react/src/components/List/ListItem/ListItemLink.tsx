/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import clsx from 'clsx';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import { Classed, deriveClassed } from 'utils/classed';
import { Tooltip, TooltipProps } from 'components/Tooltip';
import { Wrap } from 'components/Wrap';
import { ListItemGroup, ListItemGroupBaseProps } from './ListItem';

// List Item Link

export type ListItemLinkBaseProps = ListItemGroupBaseProps & {
  showHrefOnHover?: boolean;
  shortenHref?: boolean;
  isExternalLink?: boolean;
  children?: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipProps?: TooltipProps;
};

export type ListItemLinkProps = React.ComponentProps<typeof ListItemLink>;

export const ListItemLink = deriveClassed<
  Classed.ClassedComponentType<'a', ListItemLinkBaseProps>,
  Omit<ListItemLinkBaseProps, 'as'>
>(({ isExternalLink, showHrefOnHover, shortenHref = true, tooltip, tooltipProps, ...props }) => {
  const hrefProp = (props as any)?.href as string | undefined;

  const href = useMemo(() => {
    if (shortenHref) {
      return shortenUrl(hrefProp);
    }
    return undefined;
  }, [hrefProp, shortenHref]);

  const showHrefDisplay = href && (showHrefOnHover ?? isExternalLink);

  const hasTooltipProp = Boolean(tooltip);

  const tooltipEnbled = hasTooltipProp || showHrefDisplay;

  return (
    <Wrap
      if={tooltipEnbled}
      wrap={(c) => (
        <Tooltip
          {...tooltipProps}
          tooltip={
            tooltip ?? (
              <div>
                <div
                  className={clsx(
                    'relative z-0 w-full min-w-0',
                    shortenHref && 'truncate whitespace-nowrap'
                  )}
                >
                  {href}
                </div>

                {isExternalLink && (
                  <ArrowTopRightOnSquareIcon className="h-10 w-10 shrink-0 stroke-current stroke-1 text-sm" />
                )}
              </div>
            )
          }
        >
          {c}
        </Tooltip>
      )}
    >
      <ListItemGroup as="a" hoverable {...props} />
    </Wrap>
  );
});

function shortenUrl(href?: string) {
  try {
    if (!href) return undefined;

    const { hostname, pathname } = new URL(href);

    return `${hostname}${pathname}`;
  } catch {
    return undefined;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import clsx from 'clsx';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import { Classed, classed, deriveClassed } from 'utils/classed';
import { ListItemGroup, ListItemGroupBaseProps } from './ListItem';

// List Item Link

export type ListItemLinkProps = ListItemGroupBaseProps & {
  showHrefOnHover?: boolean;
  shortenHref?: boolean;
  isExternalLink?: boolean;
};

const HrefDisplay = classed(
  'div',
  'absolute bottom-0 right-0',
  'p-4',
  'rounded-tl-sm',
  'opacity-0 group-hover/li:opacity-100',
  'text-xs font-body',
  'bg-highlight-ghost text-content-weak',
  'transition-opacity',
  'flex items-center justify-start gap-4',
  'max-w-[90%]'
);

export const ListItemLink = deriveClassed<
  Classed.ClassedComponentType<'a', ListItemLinkProps>,
  Omit<ListItemLinkProps, 'as'>
>(({ isExternalLink, showHrefOnHover, shortenHref = true, ...props }) => {
  const hrefProp = (props as any)?.href as string | undefined;

  const href = useMemo(() => {
    if (!hrefProp) return undefined;

    if (shortenHref) {
      const { hostname, pathname } = new URL(hrefProp);
      return `${hostname}${pathname}`;
    }

    return hrefProp;
  }, [hrefProp, shortenHref]);

  const showHrefDisplay = href && (showHrefOnHover ?? isExternalLink);

  return (
    <ListItemGroup as="a" hoverable {...props}>
      {showHrefDisplay ? (
        <HrefDisplay>
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
        </HrefDisplay>
      ) : null}
    </ListItemGroup>
  );
});

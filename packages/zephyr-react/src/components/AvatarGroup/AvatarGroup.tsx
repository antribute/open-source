import React, { useMemo } from 'react';
import getDisplayName from 'utils/getDisplayName';
import { classed } from 'utils/classed';
import { AvatarElementName } from 'components/Avatar/Avatar.types';
import { Avatar, AvatarProps } from 'components/Avatar';
import { SimpleList } from 'components/SimpleList';
import { Wrap } from 'components/Wrap';

export interface AvatarGroupProps extends Pick<AvatarProps, 'size' | 'border'> {
  max?: number;
  stacked?: boolean;
  enableTooltip?: AvatarProps['enableTooltip'];
  children?: React.ReactNode;
  maxAdditionalAvatars?: number | null;
  totalCount?: number;
  additionalAvatarsIndicatorWrap?: (children: React.ReactNode) => React.ReactNode;
}

const AvatarGroupContainer = classed('div', 'group isolate flex items-center space-x-6', {
  variants: {
    stacked: {
      true: '-space-x-8',
    },
  },
});

const AvatarGroupRoot = ({
  children,
  max = 4,
  stacked,
  size,
  border,
  enableTooltip,
  totalCount: totalCountProp,
  maxAdditionalAvatars = 15,
  additionalAvatarsIndicatorWrap,
}: AvatarGroupProps) => {
  const hasBorder = border ?? stacked;

  const {
    visibleAvatarNodes,
    additionalAvatarsData,
    totalAdditionalAvatars,
    totalHiddenAdditionalAvatars,
  } = useMemo(() => {
    const reactNodes = React.Children.toArray(children) as React.ReactNode[];

    const validAvatarNodes = reactNodes.filter((node) => {
      const displayName = getDisplayName(node);
      return AvatarElementName.Avatar === displayName;
    }) as React.ReactElement[];

    const reduced = validAvatarNodes.reduce<{
      visibleAvatarNodes: React.ReactNode[];
      additionalAvatarsData: AvatarProps[];
      totalAdditionalAvatars: number;
    }>(
      (acc, cur, index) => {
        const { props } = cur;

        if (index < max) {
          const newProps = {
            ...props,
            enableTooltip,
            border: hasBorder,
            size,
          } as Partial<AvatarProps>;

          acc.visibleAvatarNodes.push({ ...cur, props: newProps });
          return acc;
        }

        acc.totalAdditionalAvatars += 1;

        const { additionalAvatarsData } = acc;

        if (typeof maxAdditionalAvatars !== 'number') {
          acc.additionalAvatarsData.push(props as AvatarProps);
          return acc;
        }

        if (additionalAvatarsData.length < maxAdditionalAvatars) {
          acc.additionalAvatarsData.push(props as AvatarProps);
        }

        return acc;
      },
      {
        visibleAvatarNodes: [],
        additionalAvatarsData: [],
        totalAdditionalAvatars: 0,
      }
    );

    const {
      totalAdditionalAvatars: implicitTotalAdditionalAvatars,
      additionalAvatarsData,
      visibleAvatarNodes,
    } = reduced;

    const additionalAvatarsCount = additionalAvatarsData.length;

    const explicitTotalAdditionalAvatars = (totalCountProp ?? 0) - additionalAvatarsCount;

    const totalAdditionalAvatars = Math.max(
      explicitTotalAdditionalAvatars,
      implicitTotalAdditionalAvatars
    );

    const totalHiddenAdditionalAvatars = totalAdditionalAvatars - additionalAvatarsCount;

    return {
      visibleAvatarNodes,
      additionalAvatarsData,
      totalAdditionalAvatars,
      totalHiddenAdditionalAvatars,
      additionalAvatarsCount,
    };
  }, [children, totalCountProp, max, maxAdditionalAvatars, enableTooltip, hasBorder, size]);

  return (
    <AvatarGroupContainer stacked={stacked} data-avatar-group="true">
      {visibleAvatarNodes}
      {additionalAvatarsData.length > 0 && (
        <Wrap
          if={Boolean(additionalAvatarsIndicatorWrap)}
          wrap={(children) => <>{additionalAvatarsIndicatorWrap?.(children)}</>}
        >
          <Avatar
            label={`+${totalAdditionalAvatars}`}
            color="alternate"
            shrinkContent
            border={hasBorder}
            truncateLabel={false}
            size={size}
            tooltip={
              <div className="space-y-8">
                <SimpleList.Root variant="bullets">
                  {additionalAvatarsData.map((e) => (
                    <SimpleList.Item>{e.label}</SimpleList.Item>
                  ))}
                </SimpleList.Root>
                {totalHiddenAdditionalAvatars ? (
                  <div className="text-content-inverse-moderate ml-16 text-sm opacity-80">
                    +{totalHiddenAdditionalAvatars} more
                  </div>
                ) : null}
              </div>
            }
          />
        </Wrap>
      )}
    </AvatarGroupContainer>
  );
};

const Root = AvatarGroupRoot;

export { Root, Avatar };

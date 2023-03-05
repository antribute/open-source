import { ColorSchemeName } from '@antribute/zephyr-core';
import clsx from 'clsx';
import { PaperElement, PaperElementVariantProps } from 'components/Paper/Paper.styles';
import { Position } from 'components/Position';
import { Spinner } from 'components/Spinner';
import { Wrap } from 'components/Wrap';

export type PaperProps = PaperElementVariantProps & {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hideChildrenWhileLoading?: boolean;
  colorScheme?: ColorSchemeName;
};

export const Paper = ({
  onClick,
  loading,
  children,
  hideChildrenWhileLoading,
  colorScheme = 'default',
  ...props
}: PaperProps) => {
  const as = onClick ? 'button' : 'div';

  return (
    <PaperElement
      data-color-scheme={colorScheme}
      as={as}
      onClick={onClick}
      loading={loading}
      {...props}
    >
      <Wrap
        if={hideChildrenWhileLoading}
        wrap={(c) => <div className={clsx({ invisible: loading })}>{c}</div>}
      >
        {children}
      </Wrap>
      {loading && (
        <Position position="middle-center">
          <Spinner />
        </Position>
      )}
    </PaperElement>
  );
};

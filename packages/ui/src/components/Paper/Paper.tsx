import { ColorSchemeName } from 'config';
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
  padding?: boolean;
};

export const Paper = ({
  onClick,
  loading,
  children,
  hideChildrenWhileLoading,
  colorScheme = 'default',
  padding,
  ...props
}: PaperProps) => {
  const as = onClick ? 'button' : 'div';

  return (
    <PaperElement
      data-color-scheme={colorScheme}
      as={as as never}
      onClick={onClick}
      loading={loading}
      padding={padding}
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

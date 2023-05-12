import { useCallback } from 'react';

export type DuplicateChildrenProps = {
  count?: number;
  children?: React.ReactNode;
};

export const DuplicateChildren = ({ count, children }: DuplicateChildrenProps) => {
  const renderChildren = useCallback(() => {
    if (count === 1) return children;
    return new Array(count).fill(0).map(() => children);
  }, [count]);

  return <>{renderChildren()}</>;
};

import { useCallback } from 'react';

export interface DuplicateChildrenProps {
  count?: number;
  children?: React.ReactNode;
}

export const DuplicateChildren = ({ count, children }: DuplicateChildrenProps) => {
  const renderChildren = useCallback(() => {
    if (count === 1) return children;
    // Using new Array() here is required to properly duplicate React children
    // eslint-disable-next-line unicorn/no-new-array
    return new Array(count).fill(0).map(() => children);
  }, [children, count]);

  return <>{renderChildren()}</>;
};

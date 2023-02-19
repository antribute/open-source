import React from 'react';

interface WrapProps {
  if: boolean | undefined | null | React.ReactNode;
  children?: React.ReactNode;
  wrap: (children: React.ReactNode) => JSX.Element;
}

export function Wrap({ children, if: condition, wrap: wrapper }: WrapProps) {
  return Boolean(condition) ? wrapper(children) : <>{children}</>;
}

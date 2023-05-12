import clsx from 'clsx';
import { Text, TextProps } from 'components/Text';
import React from 'react';
import { classed, generateCompoundVariants } from 'utils/classed';

export type FloatGroupProps = {
  left: TextProps;
  right?: TextProps;
  className?: string;
  style?: React.CSSProperties;
};

export const FloatGroup = React.memo(
  React.forwardRef<HTMLDivElement, FloatGroupProps>(
    ({ left, right, className, style }, forwarededRef) => {
      const hasLeft = Boolean(left?.children);
      return (
        <div className={clsx('w-full text-left', className)} style={style}>
          <FloatElement float={hasLeft} paddingLeft={hasLeft}>
            <Text {...right} />
          </FloatElement>

          <div ref={forwarededRef}>
            <Text {...left} />
          </div>
        </div>
      );
    }
  )
);

const FloatElement = classed('div', 'align-middle', {
  variants: {
    float: {
      true: 'float-right',
    },
    paddingLeft: {
      true: 'pl-16',
    },
  },
  defaultVariants: {
    paddingLeft: true,
  },
});

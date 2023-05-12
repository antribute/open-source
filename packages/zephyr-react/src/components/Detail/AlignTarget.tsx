import React from 'react';
import useDimensions from 'react-cool-dimensions';
import AutoSizer from 'react-virtualized-auto-sizer';
import { twMerge } from 'tailwind-merge';
import { measureElement } from 'utils/measureElement';

export const AlignTarget = ({
  alignTargetRef,
  children,
  className,
}: {
  alignTargetRef?: React.RefObject<HTMLElement>;
  children: React.ReactNode;
  className?: string;
}) => {
  const { observe, width } = useDimensions();

  const measure = measureElement(alignTargetRef);

  const { offsetTop: top } = measure;

  return (
    <>
      {children && (
        <div className={twMerge('z-10 shrink-0 relative', className)} style={{ width }}>
          <AutoSizer disableWidth>
            {({ height, width }) => (
              <div style={{ height, width }} className="flex flex-col items-center">
                <div ref={observe} className="absolute" style={{ top: top ?? 0 }}>
                  {children}
                </div>
              </div>
            )}
          </AutoSizer>
        </div>
      )}
    </>
  );
};

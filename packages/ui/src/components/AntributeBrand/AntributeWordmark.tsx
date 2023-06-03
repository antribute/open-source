import { twMerge } from 'tailwind-merge';
import { AntributeLogo } from './AntributeLogo';

export const AntributeWordmark = ({
  className,
  wordmarkClassName,
  children,
  logo,
}: {
  className?: string;
  wordmarkClassName?: string;
  logo?: React.ReactNode;
  children?: React.ReactNode;
}) => {
  return (
    <div className={twMerge('select-none flex items-center gap-x-[3px]', className)}>
      <AntributeLogo className="h-22 w-auto">{logo}</AntributeLogo>
      <div
        className={twMerge(
          'ml-6 font-heading  font-medium text-lg text-content-intense tracking-tight',
          wordmarkClassName
        )}
      >
        {children ?? 'Antribute'}
      </div>
    </div>
  );
};

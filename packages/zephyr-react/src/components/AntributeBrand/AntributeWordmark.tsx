import { Text } from 'components/Text';
import { AntributeLogo } from './AntributeLogo';
import { Flex } from 'components/Flex';
import { twMerge } from 'tailwind-merge';

export const AntributeWordmark = ({
  className,
  wordmarkClassName,
}: {
  className?: string;
  wordmarkClassName?: string;
}) => {
  return (
    <div className={twMerge('select-none flex items-center gap-x-[3px]', className)}>
      <AntributeLogo className="h-22 w-auto" />
      <div
        className={twMerge(
          'ml-6 font-heading  font-medium text-lg text-content-intense tracking-tight',
          wordmarkClassName
        )}
      >
        Antribute
      </div>
    </div>
  );
};

import { Flex } from 'components/Flex/Flex';
import { FlexAlignItemsProp, FlexJustifyItemsProp } from 'types/styles';

const flexAlignItemPropMap: Record<FlexAlignItemsProp, undefined> = {
  center: undefined,
  start: undefined,
  end: undefined,
  baseline: undefined,
  stretch: undefined,
};

const flexAlignItemProps = Object.keys(flexAlignItemPropMap) as FlexAlignItemsProp[];

export const Default = () => {
  return (
    <div className="relative w-160 h-160 bg-gray-100 border border-gray-200 rounded-lg dark:bg-light-gray-light dark:border-gray-dark">
      {flexAlignItemProps.map((align) => {
        return (
          <Flex align={align} className="w-full">
            <div className="bg-primary-soft text-xs font-medium text-primary text-center p-0.5 leading-none rounded-full px-2">
              {align}
            </div>
          </Flex>
        );
      })}
    </div>
  );
};

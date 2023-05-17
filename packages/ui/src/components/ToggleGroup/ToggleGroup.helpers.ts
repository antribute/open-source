export interface ElementPositonData {
  isFirst: boolean;
  isLast: boolean;
  isMiddle: boolean;
  isSelected: boolean;
  isFirstSelected: boolean;
  isLastSelected: boolean;
  isLeftSiblingSelected: boolean;
  isRightSiblingSelected: boolean;
  isFirstAndSelected: boolean;
  isLastAndSelected: boolean;
  isSecond: boolean;
  isSecondLast: boolean;
}

interface GetIndexDataOptions {
  index: number;
  selectedIndex: number;
  lastIndex: number;
}

export const getElementPositionData = ({
  index,
  lastIndex,
  selectedIndex,
}: GetIndexDataOptions): ElementPositonData => {
  const isFirst = index === 0;
  const isSecondLast = index === lastIndex - 1;
  const isSecond = index === 1;
  const isLast = index === lastIndex;
  const isMiddle = !isFirst && !isLast;

  const isSelected = index === selectedIndex;
  const isFirstSelected = selectedIndex === 0;
  const isLastSelected = selectedIndex === lastIndex;

  const isLeftSiblingSelected = index - 1 === selectedIndex;
  const isRightSiblingSelected = index + 1 === selectedIndex;

  const isFirstAndSelected = isSelected && isFirstSelected;
  const isLastAndSelected = isSelected && isLastSelected;

  return {
    isFirst,
    isLast,
    isMiddle,
    isSelected,
    isFirstSelected,
    isLastSelected,
    isLeftSiblingSelected,
    isRightSiblingSelected,
    isFirstAndSelected,
    isLastAndSelected,
    isSecond,
    isSecondLast,
  };
};

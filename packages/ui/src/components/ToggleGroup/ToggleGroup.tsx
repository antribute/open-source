import React, { useState, useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  getToggleItemBorderWidth,
  ToggleGroupContainerElement,
  ToggleGroupContainerElementVariantProps,
  ToggleGroupItemElement,
  ToggleGroupItemElementVariantProps,
} from './ToggleGroup.styles';
import { getElementPositionData } from './ToggleGroup.helpers';

export interface ToggleGroupItemData<T extends string | number = string> {
  value: T;
  label: React.ReactNode;
}

export interface ToggleGroupProps<T extends string = string>
  extends ToggleGroupItemElementVariantProps,
    ToggleGroupContainerElementVariantProps {
  disabled?: boolean;
  onValueChange?: (value: T) => void;
  defaultValue?: T;
  items: ToggleGroupItemData[];
  className?: string;
  value?: T;
}

export function ToggleGroup(props: ToggleGroupProps) {
  const {
    disabled,
    onValueChange,
    defaultValue: defaultValueProp,
    items,
    className,
    fullWidth,
    value,
  } = props;

  const defaultValue = defaultValueProp ?? items[0]?.value;

  const [selectedValue, setSelectedValue] = useState<string | undefined>(defaultValue);

  const selectedIndex = useMemo(() => {
    return items.findIndex((e) => e.value === selectedValue);
  }, [items, selectedValue]);

  const handleValueChange = useCallback(
    (val: unknown) => {
      if (val) {
        setSelectedValue(val as string);
        onValueChange?.(val as string);
      }
    },
    [setSelectedValue, onValueChange]
  );

  useEffect(() => {
    if (value && items.find((item) => item.value === value)) {
      setSelectedValue(value);
    }
  }, [value, setSelectedValue, items]);

  return (
    <ToggleGroupContainerElement
      type="single"
      id="toggle-group"
      value={selectedValue}
      onValueChange={handleValueChange}
      disabled={disabled}
      fullWidth={fullWidth}
      className={clsx(className)}
      rovingFocus
    >
      {items.map((item, index) => {
        return (
          <ToggleGroupItem
            key={item.value}
            index={index}
            item={item}
            selectedIndex={selectedIndex}
            {...props}
          />
        );
      })}
    </ToggleGroupContainerElement>
  );
}

interface ToggleGroupItemProps
  extends Pick<ToggleGroupProps, 'fontWeight' | 'size' | 'disabled' | 'items'> {
  item: ToggleGroupItemData;
  className?: string;
  index: number;
  selectedIndex: number;
}

const ToggleGroupItem = ({
  item,
  className,
  index,
  selectedIndex,
  ...props
}: ToggleGroupItemProps) => {
  const { disabled, size = 'md' } = props;
  const { value, label } = item;

  const elementPositonData = getElementPositionData({
    index,
    lastIndex: props.items.length - 1,
    selectedIndex,
  });

  return (
    <ToggleGroupItemElement
      value={value}
      disabled={disabled}
      size={size}
      className={twMerge(getToggleItemBorderWidth(elementPositonData))}
    >
      {label}
    </ToggleGroupItemElement>
  );
};

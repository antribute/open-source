import React, { useState, useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  getToggleItemBorderWidth,
  ToggleGroupElement,
  ToggleGroupElementVariantProps,
  ToggleGroupItemElement,
  ToggleGroupItemElementVariantProps,
} from './ToggleGroup.styles';
import { getElementPositionData } from './ToggleGroup.helpers';

export interface ToggleGroupItem<T extends string | number = string> {
  value: T;
  label: React.ReactNode;
}

export interface ToggleGroupProps<T extends string = string>
  extends ToggleGroupItemElementVariantProps,
    ToggleGroupElementVariantProps {
  disabled?: boolean;
  onValueChange?: (value: T) => void;
  defaultValue?: T;
  items: ToggleGroupItem[];
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
    <ToggleGroupElement
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
          <Item
            key={item.value}
            index={index}
            item={item}
            selectedIndex={selectedIndex}
            {...props}
          />
        );
      })}
    </ToggleGroupElement>
  );
}

const Item = ({
  item,
  className,
  index,
  selectedIndex,
  ...props
}: {
  item: ToggleGroupItem;
  className?: string;
  index: number;
  selectedIndex: number;
} & Pick<ToggleGroupProps, 'color' | 'fontWeight' | 'size' | 'disabled' | 'items'>) => {
  const { color = 'neutral', disabled, size = 'md' } = props;
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
      color={color}
      size={size}
      className={twMerge(getToggleItemBorderWidth(elementPositonData))}
    >
      {label}
    </ToggleGroupItemElement>
  );
};

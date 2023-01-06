import React, { useState, useMemo, useCallback, useEffect } from 'react';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import clsx from 'clsx';
import { getElementPositionData } from './ToggleGroup.helpers';
import { twMerge } from 'tailwind-merge';
import {
  getToggleItemBorderWidth,
  ToggleGroupItemElement,
  ToggleGroupItemElementVariantProps,
} from './ToggleGroup.styles';
import { ColorProp } from 'types/styles';
import { Classed, classed } from 'utils/classed';

export type ToggleGroupItem<T extends string | number = string> = {
  value: T;
  label: React.ReactNode;
};

const defaultColor: ColorProp = 'primary';

type ToggleGroupElementVariantProps = Classed.VariantProps<typeof ToggleGroupElement>;

const ToggleGroupElement = classed(
  ToggleGroupPrimitive.ToggleGroup,
  'inline-flex shadow-sm rounded-md overflow-hidden',
  {
    variants: {
      fullWidth: {
        true: 'flex w-full',
      },
    },
  }
);

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

  const defaultValue = defaultValueProp ?? items?.[0]?.value;

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue!);

  const selectedIndex = useMemo(() => {
    return items.findIndex((e) => e.value === selectedValue);
  }, [selectedValue]);

  const handleValueChange = useCallback(
    (val: any) => {
      if (val) {
        setSelectedValue(val);
        onValueChange && onValueChange(val);
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
      value={selectedValue}
      onValueChange={handleValueChange}
      disabled={disabled!}
      fullWidth={fullWidth!}
      className={clsx(className)}
    >
      {items.map((item, index) => {
        return (
          <Item key={index} index={index} item={item} selectedIndex={selectedIndex} {...props} />
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
  const { color = defaultColor, disabled, size = 'md' } = props;
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

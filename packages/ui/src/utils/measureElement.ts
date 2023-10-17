import { parseInt, reduce } from 'lodash-es';
import { changeCase } from 'utils/changeCase';
import { objectMap } from 'utils/objectMap';
import type { ValueOf } from 'type-fest';
import { getElement } from 'utils/getElement';

interface MeasureElementOptions {
  /** @default false */
  includeMargin?: boolean;

  /** @default false */
  excludeBorder?: boolean;

  /** @default false */
  excludePadding?: boolean;
}

export function measureElement<T extends HTMLElement>(
  elementOrRef?: React.RefObject<T> | T | null,
  options?: MeasureElementOptions
) {
  const { includeMargin = false, excludePadding = false, excludeBorder = false } = options ?? {};

  const el = getElement(elementOrRef);

  const signs = {
    margin: includeMargin ? 1 : 0,
    padding: excludePadding ? -1 : 0,
    border: excludeBorder ? -1 : 0,
  } satisfies Record<keyof CssAttributeDataMap, number>;

  const cssAttributes = getCssAttributeDataMap(el);

  function getSize(value: number, property: CSSAttributeDataKey) {
    const sum = reduce(
      signs,
      (acc, sign, key) => {
        const size = cssAttributes[key as CSSAttributeKey][property];
        return acc + size * sign;
      },
      value
    );

    return Math.round(sum);
  }

  const {
    width = 0,
    height = 0,
    top = 0,
    bottom = 0,
    left = 0,
    right = 0,
  } = el?.getBoundingClientRect() ?? {};

  const {
    offsetTop = 0,
    offsetLeft = 0,
    offsetWidth = 0,
    offsetHeight = 0,
    scrollLeft = 0,
    scrollWidth = 0,
    scrollTop = 0,
    scrollHeight = 0,
    clientWidth = 0,
    clientHeight = 0,
  } = el ?? {};

  const measurements = {
    width: getSize(width, 'width'),
    height: getSize(height, 'height'),
    top: getSize(top, 'top'),
    bottom: getSize(bottom, 'bottom'),
    left: getSize(left, 'left'),
    right: getSize(right, 'right'),

    offsetTop,
    offsetLeft,
    offsetHeight,
    offsetWidth,

    clientWidth,
    clientHeight,

    scrollLeft,
    scrollWidth,
    scrollTop,
    scrollHeight,
  };

  return measurements;
}

//

type CssAttributeDataMap = ReturnType<typeof getCssAttributeDataMap>;

type CSSAttributeKey = keyof CssAttributeDataMap;

type CSSAttributeDataKey = keyof ValueOf<CssAttributeDataMap>;

function getCssAttributeDataMap(el: Element | null | undefined) {
  return objectMap(['margin', 'border', 'padding'], ({ value: attribute }) => {
    const properties = objectMap(['top', 'bottom', 'left', 'right'], ({ value: baseProperty }) => {
      const attributeKey = `${attribute}${changeCase(baseProperty, 'capitalize')}` as const;

      const value = el ? parseInt(getComputedStyle(el)[attributeKey]) : 0;

      return [baseProperty, value];
    });

    const { left, right, top, bottom } = properties;

    const width = left + right;

    const height = top + bottom;

    const attributeData = { width, height, left, right, top, bottom };

    return [attribute, attributeData];
  });
}

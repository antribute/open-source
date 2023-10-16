import type { ColorSchemeName } from 'config';
import { useLayoutEffect, useState } from 'react';
import { getElement } from 'utils/getElement';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';

export function useNearestColorSchemeAttribute({
  element,
}: {
  element: React.RefObject<HTMLElement> | HTMLElement | null | undefined;
}) {
  const [colorSchemeAttribute, setColorSchemeAttribute] = useState<ColorSchemeName | undefined>(
    undefined
  );

  useLayoutEffect(() => {
    queueMicrotask(() => {
      const el = getElement(element);
      const colorScheme = getNearestColorSchemeAttribute(el);
      setColorSchemeAttribute(colorScheme);
    });
  }, [element]);

  return colorSchemeAttribute;
}

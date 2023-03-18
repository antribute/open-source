import { useEffect, useState } from 'react';
import { getNearestColorSchemeAttribute } from 'utils/getNearestColorSchemeAttribute';

export function useNearestColorSchemeAttribute({
  element,
}: {
  element: HTMLElement | null | undefined;
}) {
  const [colorSchemeAttribute, setColorSchemeAttribute] = useState<string | undefined>(undefined);

  useEffect(() => {
    setTimeout(() => {
      setColorSchemeAttribute(getNearestColorSchemeAttribute(element));
    }, 300);
  }, [element]);

  return colorSchemeAttribute;
}

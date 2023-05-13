export function elementHasOverflowY(element?: HTMLElement | unknown): boolean {
  return elementHasOverflow(element).hasOverflowY;
}

export function elementHasOverflowX(element?: HTMLElement | unknown): boolean {
  return elementHasOverflow(element).hasOverflowX;
}

export function elementHasOverflow(element?: HTMLElement | unknown): {
  hasOverflowY: boolean;
  hasOverflowX: boolean;
} {
  const getElement = () => {
    if (element && typeof element === 'object' && 'current' in element) {
      return element.current as HTMLElement;
    }
    return element;
  };

  const el = getElement();

  if (el instanceof HTMLElement) {
    return {
      hasOverflowY: el.scrollHeight > el.clientHeight,
      hasOverflowX: el.scrollWidth > el.clientWidth,
    };
  }
  return { hasOverflowY: false, hasOverflowX: false };
}

export function calculateOverflow({
  element,
}: {
  element?: HTMLElement | null;
  width: boolean;
}): boolean {
  if (element instanceof HTMLElement) {
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  }
  return false;
}

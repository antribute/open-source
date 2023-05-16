export function getElement<TElement extends HTMLElement | Element>(
  elementOrRef: React.RefObject<TElement> | TElement | null | undefined
) {
  if (!elementOrRef) return undefined;

  if (elementOrRef instanceof HTMLElement || elementOrRef instanceof Element) {
    return elementOrRef;
  }

  return elementOrRef.current;
}

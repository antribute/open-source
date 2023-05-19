import { ReactElementOrRef } from 'types/react-types';

export function getElement<TElement extends HTMLElement | Element | null>(
  elementOrRef: ReactElementOrRef<TElement>
) {
  if (!elementOrRef) return undefined;

  if (elementOrRef instanceof HTMLElement || elementOrRef instanceof Element) {
    return elementOrRef;
  }

  return elementOrRef.current;
}

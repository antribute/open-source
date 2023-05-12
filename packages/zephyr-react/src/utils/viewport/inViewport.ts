/**
 * Based on framer-motion implementation:
 *
 * https://github.com/framer/motion/blob/936e9ee810d2c720d273ab2d919526c6a096e730/packages/framer-motion/src/render/dom/viewport/index.ts
 *
 *
 */

import { toArray } from 'utils/toArray';

export type ViewChangeHandler = (entry: IntersectionObserverEntry) => void;

export interface InViewOptions {
  root?: Element | Document;
  margin?: string;
  amount?: 'any' | 'all' | number;
}

const thresholds = {
  any: 0,
  all: 1,
};

export function inView(
  element: Element | Element[],
  onStart: (entry: IntersectionObserverEntry) => void | ViewChangeHandler,
  { root, margin: rootMargin, amount = 'any' }: InViewOptions = {}
): VoidFunction {
  const elements = toArray(element);

  const activeIntersections = new WeakMap<Element, ViewChangeHandler>();

  const onIntersectionChange: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);

      /**
       * If there's no change to the intersection, we don't need to
       * do anything here.
       */
      if (entry.isIntersecting === Boolean(onEnd)) return;

      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry);
        if (typeof newOnEnd === 'function') {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (onEnd) {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === 'number' ? amount : thresholds[amount],
  });

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}

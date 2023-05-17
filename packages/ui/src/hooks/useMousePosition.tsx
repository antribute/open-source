import { useRef, useState, useEffect, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export interface MousePosition {
  x: number | null;
  y: number | null;
}

const nullMousePosition: MousePosition = {
  x: null,
  y: null,
};

export interface UseMousePositionProps {
  includeTouch?: boolean;
  shouldUpdate?: boolean;
  updateDelay?: number;
  onMousePositionUpdate?: (cur: MousePosition, prev: MousePosition) => void;
}

export const useMousePosition = (options?: UseMousePositionProps): MousePosition => {
  const { includeTouch, shouldUpdate = true, updateDelay, onMousePositionUpdate } = options ?? {};

  const isInitialized = useRef<boolean>(false);

  const [mousePosition, setMousePosition] = useState<MousePosition>(nullMousePosition);

  const debouncedSetMousePosition = useDebouncedCallback((newPosition: MousePosition) => {
    setMousePosition(newPosition);
    onMousePositionUpdate?.(newPosition, mousePosition);
    isInitialized.current = true;
  }, updateDelay ?? 0);

  const updateMousePosition = useCallback(
    (ev: MouseEvent | TouchEvent) => {
      if (isInitialized.current && !shouldUpdate) return;

      let x: number;
      let y: number;
      if ('touches' in ev) {
        const touch = ev.touches[0]!;
        [x, y] = [touch.clientX, touch.clientY];
      } else {
        [x, y] = [ev.clientX, ev.clientY];
      }

      debouncedSetMousePosition({ x, y });
    },
    [debouncedSetMousePosition, shouldUpdate]
  );

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition);
    if (includeTouch) {
      window.addEventListener('touchmove', updateMousePosition);
    }
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (includeTouch) {
        window.removeEventListener('touchmove', updateMousePosition);
      }
    };
  }, [includeTouch, updateMousePosition]);

  return mousePosition;
};

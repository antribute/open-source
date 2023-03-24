/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { forEach, mapValues } from 'lodash-es';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';

function mediaQueryEventId(id?: string) {
  return ['media-query', id, 'change'].filter(Boolean).join('-');
}
type QueryMapOption = Record<string, string | undefined>;

type QueryOption = string | QueryMapOption;

type QueryReturn<T extends QueryOption> = T extends QueryMapOption
  ? { [K in keyof T]: boolean }
  : boolean;

export function useMediaQuery<
  TQuery extends string | QueryMapOption,
  TReturn extends QueryReturn<TQuery> = QueryReturn<TQuery>
>(query: TQuery): TReturn {
  const initial =
    typeof query === 'string' ? false : (mapValues(query, () => false) as Record<string, boolean>);
  const [matches, setMatches] = useImmer(initial);

  useEffect(
    () => {
      if (typeof query === 'string') {
        const mediaQuery = window.matchMedia(query);
        // Update the state with the current value
        setMatches(mediaQuery.matches);
        // Create an event listener
        const handler = (event: any) => setMatches(event.matches);
        // Attach the event listener to know when the matches value changes
        mediaQuery.addEventListener(mediaQueryEventId(), handler);
        // Remove the event listener on cleanup
        return () => mediaQuery.removeEventListener(mediaQueryEventId(), handler);
      }

      type MediaQueryEntry = [
        string,
        { mediaQuery: MediaQueryList; handler: (event: any) => void } | undefined
      ];

      const mediaQueryMap = Object.fromEntries(
        Object.entries(query).map(([key, value]): MediaQueryEntry => {
          if (!value) {
            return [key, undefined];
          }
          const mediaQuery = window.matchMedia(value);

          const handler = (event: any) =>
            setMatches((d) => {
              d[key as keyof typeof d] = event.matches;
            });

          mediaQuery.addEventListener(mediaQueryEventId(key), handler);

          return [key, { mediaQuery, handler }];
        }, {})
      );

      const mediaQueryMatches = mapValues(mediaQueryMap, (value) =>
        value ? value.mediaQuery.matches : false
      );

      setMatches(mediaQueryMatches);

      return () =>
        forEach(mediaQueryMap, (value, key) => {
          if (value) {
            value.mediaQuery.removeEventListener(mediaQueryEventId(key), value.handler);
          }
        });
    },
    [] // Empty array ensures effect is only run on mount and unmount
  );
  return matches as TReturn;
}

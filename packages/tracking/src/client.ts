import { createCtx } from '@antribute/utils-react';
import mixpanel from 'mixpanel-browser';

import { buildLoggingPrefix } from './common';

export interface TrackingContext {
  globalParams?: Record<string, unknown>;
  token?: string | undefined;
}

const [useTrackingContext, TrackingContextProvider] = createCtx<TrackingContext>();

export const useTracking = () => {
  const { globalParams, token } = useTrackingContext();
  if (token) {
    mixpanel.init(token);
  }
  return (eventName: string, additionalData?: Record<string, unknown>) => {
    if (token) {
      mixpanel.track(eventName, { ...globalParams, ...additionalData });
    }
    // eslint-disable-next-line no-console
    console.info(`${buildLoggingPrefix(token)} ${eventName}`, {
      ...globalParams,
      ...additionalData,
    });
  };
};
export { TrackingContextProvider as TrackingProvider };

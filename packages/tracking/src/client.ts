import mixpanel from 'mixpanel-browser';
import { createContext, useContext } from 'react';

import { buildLoggingPrefix } from './common';

export interface TrackingContext {
  globalParams?: Record<string, unknown>;
  token?: string | undefined;
}

const trackingContext = createContext<TrackingContext>({});
const TrackingProvider = trackingContext.Provider;

export const useTracking = () => {
  const { globalParams, token } = useContext(trackingContext);
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
export { TrackingProvider };

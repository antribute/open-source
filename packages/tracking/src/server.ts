import Mixpanel from 'mixpanel';

import { buildLoggingPrefix } from './common';

// Allowing logging in some portions of this file - we want devs to be able to see their tracking
// and ensure it works

export interface TrackParams {
  event: string;
  ipAddress?: string;
  token?: string | undefined;
}

export function track(
  { event, ipAddress, token }: TrackParams,
  additionalData: Record<string, unknown> = {}
) {
  if (token) {
    const mixpanel = Mixpanel.init(token);
    mixpanel.track(event, { ...additionalData, ipAddress });
  }
  // eslint-disable-next-line no-console
  console.info(`${buildLoggingPrefix(token)} ${event}`, additionalData);
}

export interface UpdateUserParams {
  token?: string;
  userId: string;
}

export function updateUser({ token, userId }: UpdateUserParams, userData: Record<string, unknown>) {
  if (token) {
    const mixpanel = Mixpanel.init(token);
    mixpanel.people.set(userId, userData);
  }
  // eslint-disable-next-line no-console
  console.info(`${buildLoggingPrefix(token)} Updating User with ID ${userId}`, userData);
}

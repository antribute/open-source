import pc from 'picocolors';

// eslint-disable-next-line import/prefer-default-export
export const buildLoggingPrefix = (token?: string) =>
  pc.blue(token?.length ? '[Tracking]:' : '[Tracking (Log Only)]:');

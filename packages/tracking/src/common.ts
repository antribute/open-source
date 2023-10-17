import pc from 'picocolors';

export const buildLoggingPrefix = (token?: string) =>
  pc.blue(token?.length ? '[Tracking]:' : '[Tracking (Log Only)]:');

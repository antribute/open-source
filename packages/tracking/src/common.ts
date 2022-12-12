import clc from 'cli-color';

// eslint-disable-next-line import/prefer-default-export
export const buildLoggingPrefix = (token?: string) =>
  clc.blue(token?.length ? '[Tracking]:' : '[Tracking (Log Only)]:');

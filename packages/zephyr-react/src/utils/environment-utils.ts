export function isClientSide() {
  return typeof window !== 'undefined';
}

export function isDevelopment(): boolean {
  if (
    typeof window === 'undefined' &&
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'
  ) {
    // Running in a Node.js server environment
    return true;
  }
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
  ) {
    // Running in a browser on a local machine
    return true;
  }
  // Default to production
  return false;
}

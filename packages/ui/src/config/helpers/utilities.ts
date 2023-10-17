export function mergeObjects<T extends Record<string, any>>(objects: T[]): T {
  return objects.reduce<T>(
    (acc, obj) => ({ ...acc, ...obj }),
    // @ts-expect-error empty object
    {}
  );
}

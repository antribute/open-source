/* eslint-disable no-console */
import path from 'path';

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

export function upsertToMap<K extends string, T>(map: Map<K, T[]>, key?: K, value?: T): void {
  if (key !== undefined) {
    const currentValues = map.get(key) || [];

    const newValue = new Set([...currentValues, ...(value ? [value] : [])]);

    map.set(key, [...newValue]);
  }
}

export function getSourceFileImportPath(
  pathName: string,
  { importWithExtensions }: { importWithExtensions?: boolean }
) {
  return resolveSourceFilePath(importWithExtensions ? pathName : removeExtension(pathName));
}

function removeExtension(path: string) {
  return path.replace(/\.[^.]+$/, '');
}

export function resolveSourceFilePath(path: string) {
  const parts = path.split('/');

  const srcIndex = parts.findLastIndex((v) => v === 'src');

  return parts.slice(srcIndex + 1).join('/');
}

export function resolveOutputFilePath(outputPath: string, defaultFileName: string) {
  const out = resolveDirFilePath(outputPath);

  if (path.extname(outputPath) === '') {
    return path.join(out, defaultFileName);
  }

  return out;
}

export function resolveDirFilePath(dirPath: string) {
  return path.join(process.cwd(), resolveBasePath(dirPath));
}

export function resolveBasePath(routePath: string, baseName = '/src'): string {
  const base = baseName.startsWith('/') ? baseName.slice(1) : baseName;

  // Remove leading and trailing slashes
  let resolvedPath = routePath.trim();

  // Trim baseName
  if (resolvedPath.startsWith(baseName)) {
    resolvedPath = resolvedPath.slice(baseName.length);
  }

  // Trim leading ./
  if (resolvedPath.startsWith('./')) {
    resolvedPath = resolvedPath.slice(2);
  }

  // Trim trailing /
  if (resolvedPath.endsWith('/')) {
    resolvedPath = resolvedPath.slice(0, -1);
  }

  // Trim leading . and /
  if (matchStringFn('startsWith', ['.', '/'])(resolvedPath)) {
    resolvedPath = resolvedPath.slice(1);
  }

  const dirPath = `${base}/${resolvedPath}`;

  return dirPath;
}

export function matchStringFn(matchType: 'equals' | 'startsWith' | 'endsWith', matches: string[]) {
  if (matchType === 'startsWith')
    return makeStringMatchFn(matches, (str, match) => str.startsWith(match));

  if (matchType === 'endsWith')
    return makeStringMatchFn(matches, (str, match) => str.endsWith(match));

  return makeStringMatchFn(matches, (str, match) => str === match);
}

function makeStringMatchFn(matches: string[], predicate: (str: string, match: string) => boolean) {
  return (str: string | undefined | null) => {
    if (typeof str !== 'string') return false;

    return matches.some((match) => predicate(str, match));
  };
}

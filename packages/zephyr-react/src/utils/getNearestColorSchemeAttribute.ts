export function getNearestColorSchemeAttribute(element?: HTMLElement | null, fallback = 'default') {
  if (!element) return fallback;

  return element.closest('[data-color-scheme]')?.getAttribute('data-color-scheme') ?? fallback;
}

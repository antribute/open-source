export function getNearestColorSchemeAttribute(element?: HTMLElement | null) {
  if (!element) return undefined;

  return element.closest('[data-color-scheme]')?.getAttribute('data-color-scheme') ?? undefined;
}

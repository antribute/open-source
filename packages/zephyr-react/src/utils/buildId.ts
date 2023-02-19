import { notEmpty } from 'utils/notEmpty';

export function buildId(
  parts: (string | number | undefined | false | null)[],
  options: { separator: string } = { separator: '::' }
) {
  return parts.filter(notEmpty).join(options.separator);
}

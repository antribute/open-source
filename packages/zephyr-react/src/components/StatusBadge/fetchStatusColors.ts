import statusToColorMap from 'components/StatusBadge/statusToColorMap';
import { get, pick } from 'lodash-es';
import { colorToTWTokenMap, colorVariants } from 'styles/colors.variants';
import { mergeVariants } from 'utils/classed';

export async function fetchStatusColor<
  TPick extends Partial<Record<keyof typeof colorVariants, true>>
>(label: string | undefined, picked: TPick) {
  if (!label) return undefined;

  const response = await import('./statusToColorMap');
  const { default: statusColorMap } = response;

  function getColorName() {
    const word = label?.toLowerCase() ?? '';

    if (word in statusColorMap) {
      return get(statusColorMap, word);
    }

    const wordParts = word.split(' ');

    const wordMatch = wordParts.find((word) => word in statusToColorMap);

    return wordMatch ? get(statusColorMap, wordMatch) : undefined;
  }

  const colorName = getColorName();

  if (!colorName) return undefined;

  const colorToken = get(colorToTWTokenMap, colorName) as string | undefined;

  if (!colorToken) return undefined;

  const colors = mergeVariants(pick(colorVariants, Object.keys(picked)));

  const colorClass = get(colors, colorToken) || undefined;

  return colorClass as string | undefined;
}

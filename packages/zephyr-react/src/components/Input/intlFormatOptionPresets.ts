export type IntlNumberFormatPreset = keyof typeof intlNumberFormatPresets;

const intlNumberFormatPresets = {
  currency: {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'symbol',
    signDisplay: 'auto',
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumSignificantDigits: undefined,
    maximumSignificantDigits: undefined,
  },
  percent: {
    style: 'percent',
    useGrouping: true,
    minimumIntegerDigits: 1,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    minimumSignificantDigits: undefined,
    maximumSignificantDigits: undefined,
  },
} satisfies Record<string, Intl.NumberFormatOptions>;

export function getIntlNumberFormatOptions({
  type,
  formatOptions,
}: {
  type?: IntlNumberFormatPreset;
  formatOptions?: Intl.NumberFormatOptions;
}) {
  const preset = type ? intlNumberFormatPresets[type] : undefined;

  if (!formatOptions && !preset) return undefined;

  return {
    ...preset,
    ...formatOptions,
  };
}

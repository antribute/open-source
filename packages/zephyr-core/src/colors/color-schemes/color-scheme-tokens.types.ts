import { ColorAlphaVariant } from '../colors.constants';
import { ColorShadeVariant } from '../colors.types';

export type ColorSchemeToken =
  | 'base'
  | TokenVariant<'primary'>
  | TokenVariant<'secondary'>
  | TokenVariant<'inverse'>
  | TokenShadeVariant<'surface'>
  | TokenShadeVariant<'heart'>
  | TokenShadeVariant<'info'>
  | TokenShadeVariant<'positive'>
  | TokenShadeVariant<'caution'>
  | TokenShadeVariant<'danger'>
  | TokenStrengthVariant<'highlight', 'weak' | 'moderate' | 'high' | 'strong' | 'DEFAULT'>
  | TokenStrengthVariant<
      'boundary',
      'tint' | 'ghost' | 'subtle' | 'weak' | 'moderate' | 'high' | 'strong' | 'DEFAULT'
    >
  | ContentTokenVariant<'content'>;

type TokenVariant<T extends string> =
  | TokenShadeVariant<T>
  | MinMaxContentContrastTokenVariant<T>
  | `${T}-content`;

type ContentTokenName<T extends string> = T extends 'content' ? 'content' : `${T}-content`;

type MinMaxContentContrastTokenVariant<T extends string> =
  | `${ContentTokenName<T>}-min-contrast`
  | `${ContentTokenName<T>}-max-contrast`;

type ContentTokenVariant<T extends string> =
  | TokenStrengthVariant<ContentTokenName<T>>
  | MinMaxContentContrastTokenVariant<T>;

type TokenShadeVariant<T extends string> = T | `${T}-${ColorShadeVariant}`;

type TokenStrengthVariant<
  T extends string,
  TPick extends ColorAlphaVariant | 'DEFAULT' = ColorAlphaVariant | 'DEFAULT'
> = `${T}-${Exclude<TPick, 'DEFAULT'>}` | (TPick extends 'DEFAULT' ? T : never);

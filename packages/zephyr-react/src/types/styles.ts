export type SizeProp = 'xs' | 'sm' | 'md' | 'lg';

export type ColorProp = 'primary' | 'secondary' | 'positive' | 'danger' | 'caution';

export type WidthProp = 'full' | 'fixed' | 'auto';

export type RoundedProp = 'default' | 'full';

export type FlexAlignItemsProp = 'center' | 'start' | 'end' | 'baseline' | 'stretch';

export type FlexJustifyItemsProp = 'center' | 'start' | 'end' | 'between' | 'evenly' | 'around';

export type PositionProp =
  | 'top-center'
  | 'top-left'
  | 'top-right'
  | 'middle-center'
  | 'middle-left'
  | 'middle-right'
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right';

export type FontWeightProp =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

export type VariantMap<TKey extends string, TAvailable extends TKey = TKey> = Partial<
  Record<TAvailable, string>
>;

type VariantPropMapItem<TPropName extends string, TProp extends string> = Partial<
  Record<TPropName, VariantMap<TProp>>
>;

export type ClassedVariantMap = Partial<{
  color: VariantPropMapItem<'textColor' | 'borderColor' | 'backgroundColor', ColorProp>;
  size: VariantPropMapItem<'textSize' | 'lineHeight' | 'paddingX' | 'paddingY', SizeProp>;
  fontWeight: VariantMap<FontWeightProp>;
  width: VariantMap<WidthProp>;
}>;

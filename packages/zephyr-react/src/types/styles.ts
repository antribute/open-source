export type SizeProp<TSizeProperties extends keyof ISizeProperties = 'base'> =
  ISizeProperties[TSizeProperties];

type BaseSizeProp = 'xs' | 'sm' | 'md' | 'lg';

interface ISizeProperties {
  base: BaseSizeProp;
  inline: PrefixedSizeProp<'inline'>;
}

export type PrefixedSizeProp<
  TPrefix extends string,
  TBaseSizeProp extends BaseSizeProp = BaseSizeProp
> = `${TPrefix}${Capitalize<TBaseSizeProp>}`;

export type InlineSizeProp = PrefixedSizeProp<'inline'>;

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type OrientationProp = 'vertical' | 'horizontal';

export type ColorProp =
  | 'neutral'
  | 'weak'
  | 'moderate'
  | 'strong'
  | 'primary'
  | 'info'
  | 'success'
  | 'danger'
  | 'caution';

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

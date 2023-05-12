/* eslint-disable @typescript-eslint/no-explicit-any */
import { textVariants } from 'styles/text.variants';
import { Classed, classed, deriveClassed } from 'utils/classed';
import { HeadingLevel } from 'types/styles';
import { CSSProperties } from 'react';
import { TextComponentType, textComponentProps } from 'components/Text/textComponentProps';
import { Dot } from 'components/Text/Dot';
import { DuplicateChildren } from 'components/Text/DuplicateChildren';

type TextElementProps = React.ComponentProps<typeof TextElement>;

type TextElementVariantProps = Classed.VariantProps<typeof TextElement>;

export const TextElement = classed('span', {
  variants: {
    size: textVariants.size,
    fontWeight: textVariants.fontWeight,
    color: textVariants.color,
    leading: textVariants.leading,
    align: textVariants.align,
    font: textVariants.font,
    spaceY: textVariants.spaceY,
    spaceX: textVariants.spaceX,
    maxLines: textVariants.maxLines,
    uppercase: {
      true: 'uppercase',
    },
    noWrap: {
      true: 'whitespace-nowrap',
    },
    bold: {
      true: textVariants.fontWeight.bold,
    },
    medium: {
      true: textVariants.fontWeight.medium,
    },
    tracking: {
      wide: 'tracking-wide',
      tight: 'tracking-tight',
    },
    block: {
      true: 'block',
    },
    fullWidth: {
      true: 'w-full',
    },
    truncate: {
      true: 'truncate',
    },
    selectNone: {
      true: 'select-none',
    },
    italic: {
      true: 'italic',
    },
  },
  defaultVariants: {
    color: 'current',
  },
});

export type TextProps = {
  className?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
} & TextElementVariantProps &
  Pick<TextElementProps, 'aria-hidden' | 'as'>;

const TextComponent = deriveClassed<typeof TextElement, TextProps>(
  ({ children, className, as, ...props }, forwardedRef) => {
    return (
      <TextElement className={className} as={as as any} {...props} ref={forwardedRef}>
        {children}
      </TextElement>
    );
  }
);

// Heading Components

type HeadingFontProps = { as: HeadingLevel } & Omit<TextProps, 'as' | 'size' | 'font'>;

const Header = ({ as, ...props }: HeadingFontProps) => <Text as="a" {...props} />;

type TextHeadingProps = Omit<HeadingFontProps, 'as'>;

const H1 = (props: TextHeadingProps) => <Header as="h1" {...props} />;
const H2 = (props: TextHeadingProps) => <Header as="h2" {...props} />;
const H3 = (props: TextHeadingProps) => <Header as="h3" {...props} />;
const H4 = (props: TextHeadingProps) => <Header as="h4" {...props} />;
const H5 = (props: TextHeadingProps) => <Header as="h5" {...props} />;
const H6 = (props: TextHeadingProps) => <Header as="h6" {...props} />;

// Preset Text Components

type TxtProps = Omit<TextProps, 'as'>;

const PresetTextComponent = deriveClassed<
  typeof TextElement,
  TxtProps & { preset: TextComponentType }
>(({ preset, ...props }, forwardedRef) => {
  return <TextComponent {...textComponentProps[preset]} {...props} ref={forwardedRef} />;
});

const Overline = (props: TxtProps) => <PresetTextComponent preset="overline" {...props} />;
const Heading = (props: TxtProps) => <PresetTextComponent preset="heading" {...props} />;
const Subheading = (props: TxtProps) => <PresetTextComponent preset="subheading" {...props} />;
const Title = (props: TxtProps) => <PresetTextComponent preset="title" {...props} />;
const Subtitle = (props: TxtProps) => <PresetTextComponent preset="subtitle" {...props} />;
const Body = (props: TxtProps) => <PresetTextComponent preset="body" {...props} />;
const Description = (props: TxtProps) => <PresetTextComponent preset="description" {...props} />;
const Caption = (props: TxtProps) => <PresetTextComponent preset="caption" {...props} />;

// Character Components
interface CharComponentProps {
  count?: number;
  className?: string;
}

const Br = (props: CharComponentProps) => (
  <DuplicateChildren {...props}>
    <br />
  </DuplicateChildren>
);

const Space = (props: CharComponentProps) => (
  <DuplicateChildren {...props}>&nbsp;</DuplicateChildren>
);

const Blank = (props: CharComponentProps) => (
  <DuplicateChildren {...props}>&#8205;</DuplicateChildren>
);

/** Dash symbol */
const Dash = (props: CharComponentProps) => (
  <DuplicateChildren {...props}> &ndash;</DuplicateChildren>
);

// SubComponents

const SubComponents = {
  /** Header 1 */
  H1,
  /** Header 2 */
  H2,
  /** Header 3 */
  H3,
  /** Header 4 */
  H4,
  /** Header 5 */
  H5,
  /** Header 6 */
  H6,

  /** Preset Text component */
  Overline,
  /** Preset Text component */
  Heading,
  /** Preset Text component */
  Subheading,
  /** Preset Text component */
  Title,
  /** Preset Text component */
  Subtitle,
  /** Preset Text component */
  Body,
  /** Preset Text component */
  Caption,
  /** Preset Text component */
  Description,

  /** Line break: <br/> */
  Br,
  /** Simple dot symbol */
  Dot,
  /** White space */
  Space,
  /** Invisible character */
  Blank,
  /** Dash symbol */
  Dash,
};

const Text = Object.assign(TextComponent, SubComponents);

export { Text };

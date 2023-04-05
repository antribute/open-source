/* eslint-disable @typescript-eslint/no-explicit-any */
import { textVariants } from 'styles/text.variants';
import { Classed, classed } from 'utils/classed';
import { HeadingLevel, SizeProp } from 'types/styles';
import { Wrap } from 'components/Wrap';
// import Balancer from 'react-wrap-balancer';

// Due to issues with text size class conflcits, using `basicClassed` which doesn't use `tw-merge`
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

type TextProps = {
  className?: string;
  children?: React.ReactNode;
  // balancer?: boolean;
  // balancerRatio?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'b' | 'i' | 'div';
} & Classed.VariantProps<typeof TextElement>;

const Text = ({
  children,
  className,
  // balancerRatio,
  // balancer,
  fullWidth,
  as,
  ...props
}: TextProps) => {
  // const showBalancer = balancer ?? typeof balancerRatio === 'number';

  return (
    <TextElement
      className={className}
      as={as as any}
      {...props}
      // Balancer requires 100% width inorder to balance properly
      fullWidth={
        fullWidth
        // ?? showBalancer
      }
    >
      {/* {showBalancer ? <Balancer ratio={balancerRatio}>{children}</Balancer> : children} */}
      {children}
    </TextElement>
  );
};

// Body Font

type BodyFontProps = { size?: SizeProp } & Omit<TextProps, 'size' | 'font'>;

const Body = (props: BodyFontProps) => <Text font="body" color="current" {...props} />;

type TextBodyProps = Omit<BodyFontProps, 'as'>;

Text.Paragraph = (props: TextBodyProps) => <Body as="span" {...props} />;

// Heading Font

type HeadingFontProps = { as: HeadingLevel } & Omit<TextProps, 'as' | 'size' | 'font'>;

const Heading = ({ as, ...props }: HeadingFontProps) => (
  <Text as={as} size={as} font="heading" color="intense" {...props} />
);

type TextHeadingProps = Omit<HeadingFontProps, 'as'>;

Text.H1 = (props: TextHeadingProps) => <Heading as="h1" {...props} />;
Text.H2 = (props: TextHeadingProps) => <Heading as="h2" {...props} />;
Text.H3 = (props: TextHeadingProps) => <Heading as="h3" {...props} />;
Text.H4 = (props: TextHeadingProps) => <Heading as="h4" {...props} />;
Text.H5 = (props: TextHeadingProps) => <Heading as="h5" {...props} />;
Text.H6 = (props: TextHeadingProps) => <Heading as="h6" {...props} />;

// Other

Text.Bold = (props: TextBodyProps) => <Body as="b" fontWeight="bold" {...props} />;
Text.Italic = (props: TextBodyProps) => <Body as="i" italic {...props} />;
Text.LineBreak = () => <br />;
Text.Dash = ({ className }: { className?: string }) => (
  <Wrap if={Boolean(className)} wrap={(c) => <span className={className}>{c}</span>}>
    &ndash;
  </Wrap>
);
Text.InvisibleCharacter = () => <>&#8205;</>;
Text.WhiteSpace = ({ count = 1 }: { count?: number }) =>
  count === 1 ? (
    <>&nbsp;</>
  ) : (
    <>
      {new Array(count).fill(0).map(() => (
        <>&nbsp;</>
      ))}
    </>
  );

export { Text };

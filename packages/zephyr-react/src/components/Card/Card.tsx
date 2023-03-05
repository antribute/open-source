import {
  CardBodyElement,
  CardContainerElement,
  CardDescriptionElement,
  CardFooterElement,
  CardTitleAreaElement,
} from 'components/Card/Card.styles';
import { Classed, classed, deriveClassed } from 'utils/classed';

// Container

export type CardContainerVariantProps = Classed.ComponentProps<typeof CardContainerElement>;

export type CardContainerProps = React.ComponentProps<typeof CardContainerElement>;

const CardContainer = deriveClassed<
  typeof CardContainerElement,
  Classed.ComponentProps<typeof CardContainerElement>
>((props: CardContainerProps) => {
  const isButton = 'onClick' in props;
  return (
    <CardContainerElement
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      as={(isButton ? 'button' : 'div') as any}
      hoverHighlight={isButton}
      cursorPointer={isButton}
      {...props}
    />
  );
});

// Title

export type CardTitleProps = React.ComponentProps<typeof CardTitleAreaElement>;

const CardTitleArea = (props: CardTitleProps) => {
  return <CardTitleAreaElement {...props} />;
};

//  Body
export type CardBodyProps = React.ComponentProps<typeof CardBodyElement>;

const CardBody = (props: CardBodyProps) => {
  return <CardBodyElement {...props} />;
};

//  Body
export type CardDescriptionProps = React.ComponentProps<typeof CardDescriptionElement>;

const Description = (props: CardDescriptionProps) => {
  return <CardDescriptionElement {...props} />;
};

// Footer

export type CardFooterProps = React.ComponentProps<typeof CardFooterElement>;

const CardFooter = (props: CardFooterProps) => {
  return <CardFooterElement {...props} />;
};

// Exports

const Container = CardContainer;
const Title = CardTitleArea;
const Body = CardBody;
const Footer = CardFooter;

export { Container, Title, Body, Description, Footer };

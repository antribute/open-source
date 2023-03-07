import { ColorSchemeName } from '@antribute/zephyr-core';
import {
  CardBodyElement,
  CardContainerElement,
  CardDescriptionElement,
  CardFooterElement,
  CardHeadingElement,
  CardTitleAreaElement,
} from 'components/Card/Card.styles';
import { Paper, PaperProps } from 'components/Paper';
import { Classed, classed, deriveClassed } from 'utils/classed';

// Container

export type CardContainerVariantProps = Classed.ComponentProps<typeof CardContainerElement>;

export type CardContainerProps = PaperProps & { colorScheme?: ColorSchemeName };

const CardContainer = (props: CardContainerProps) => {
  const isButton = 'onClick' in props;
  return <Paper hoverHighlight={isButton} cursorPointer={isButton} {...props} />;
};

// Title

export type CardTitleProps = React.ComponentProps<typeof CardTitleAreaElement>;

const CardTitleArea = (props: CardTitleProps) => {
  return <CardTitleAreaElement {...props} />;
};

// Title

export type CardTitleHeadingProps = React.ComponentProps<typeof CardHeadingElement>;

const CardTitleHeading = (props: CardTitleHeadingProps) => {
  return <CardHeadingElement {...props} />;
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
const TitleHeading = CardTitleHeading;

export { Container, Title, TitleHeading, Body, Description, Footer };

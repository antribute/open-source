import { SVGProps } from 'react';

export type ReactSvgProps = SVGProps<SVGSVGElement>;

export type ReactElementOrRef<
  TElement extends HTMLElement | Element | null = HTMLElement | Element | null
> = React.RefObject<TElement> | TElement | null | undefined;

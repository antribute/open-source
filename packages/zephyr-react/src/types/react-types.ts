import { SVGProps, RefObject, ReactDOM, HTMLAttributes, DOMFactory } from 'react';

export type ReactSvgProps = SVGProps<SVGSVGElement>;

/**
 * A map of HTML element names and their interface types.
 * For example `'a'` -> `HTMLAnchorElement`.
 */
type IntrinsicHTMLElements = {
  [K in keyof IntrinsicHTMLAttributes]: IntrinsicHTMLAttributes[K] extends HTMLAttributes<infer T>
    ? T
    : never;
};

/**
 * A map of HTML element names and their attribute interface types.
 * For example `'a'` -> `AnchorHTMLAttributes<HTMLAnchorElement>`.
 */
type IntrinsicHTMLAttributes = {
  [K in keyof ReactDOM]: ReactDOM[K] extends DOMFactory<infer T, any> ? T : never;
};

/**
 * The intrinsic HTML element names that `useTextField` supports; e.g. `input`,
 * `textarea`.
 */
export type TextFieldIntrinsicElements = keyof Pick<IntrinsicHTMLElements, 'input' | 'textarea'>;

export type DefaultTextFieldElementType = 'input';

/**
 * The HTML element interfaces that `useTextField` supports based on what is
 * defined for `TextFieldIntrinsicElements`; e.g. `HTMLInputElement`,
 * `HTMLTextAreaElement`.
 */
export type TextFieldHTMLElementType = Pick<IntrinsicHTMLElements, TextFieldIntrinsicElements>;

/**
 * The HTML attributes interfaces that `useTextField` supports based on what
 * is defined for `TextFieldIntrinsicElements`; e.g. `InputHTMLAttributes`,
 * `TextareaHTMLAttributes`.
 */
export type TextFieldHTMLAttributesType = Pick<IntrinsicHTMLAttributes, TextFieldIntrinsicElements>;

/**
 * The type of `ref` object that can be passed to `useTextField` based on the given
 * intrinsic HTML element name; e.g.`RefObject<HTMLInputElement>`,
 * `RefObject<HTMLTextAreaElement>`.
 */
export type TextFieldRefObject<T extends TextFieldIntrinsicElements> = RefObject<
  TextFieldHTMLElementType[T]
>;

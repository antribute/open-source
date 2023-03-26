import React from 'react';

import { ForwardRef, isElement } from 'react-is';

/**
 * isClassComponent is a utility function that checks if a component is a class component in React.
 * @param component The component to check.
 * @returns Returns `true` if the component is a class component, and `false` otherwise.
 *
 * @example
 * const Component = class extends React.Component {};
 * console.log(isClassComponent(Component)); // outputs: true
 */
export function isClassComponent(component: unknown): component is React.ComponentClass {
  return typeof component === 'function' && !!component.prototype.isReactComponent;
}

/**
 * isFunctionComponent is a utility function that checks if a component is a functional component in React.
 * @param component The component to check.
 * @returns Returns `true` if the component is a functional component, and `false` otherwise.
 *
 * @example
 * const Component = () => <div />;
 * console.log(isFunctionComponent(Component)); // outputs: true
 */
export function isFunctionComponent(component: unknown): component is React.FunctionComponent {
  return (
    typeof component === 'function' && String(component).includes('return React.createElement')
  );
}

/**
 * isReactComponent is a utility function that checks if a component is either a class component or a functional component in React.
 * @param component The component to check.
 * @returns Returns `true` if the component is either a class component or a functional component, and `false` otherwise.
 *
 * @example
 * const ClassComponent = class extends React.Component {};
 * const FunctionComponent = () => <div />;
 * console.log(isReactComponent(ClassComponent)); // outputs: true
 * console.log(isReactComponent(FunctionComponent)); // outputs: true
 */
export function isReactComponent(component: unknown): component is React.ComponentType {
  return isClassComponent(component) || isFunctionComponent(component);
}

/**
 * isInlineFunctionComponent is a utility function that checks if a component is an inline functional component in React.
 * @param component The component to check.
 * @returns Returns `true` if the component is an inline functional component, and `false` otherwise.
 *
 * @example
 * console.log(isInlineFunctionComponent((props) => <div />)); // outputs: true
 */
export function isInlineFunctionComponent(
  component: unknown
): component is React.FunctionComponent {
  if (typeof component !== 'function') return false;

  const componentString = String(component);

  return componentString.includes('=>') && componentString.includes('React.createElement');
}

/**
 * isDOMTypeElement is a utility function that checks if an element is a DOM type element in React.
 * @param element The element to check.
 * @returns Returns `true` if the element is a DOM type element, and `false` otherwise.
 *
 * @example
 * const Element = <div />;
 * console.log(isDOMTypeElement(Element)); // outputs: true
 */
export function isDOMTypeElement(
  element: unknown
): element is React.ReactElement<React.DOMAttributes<Element>, string> {
  return isElement(element) && typeof element.type === 'string';
}

/**
 * isCompositeTypeElement is a utility function that checks if an element is a composite component in React.
 * @param element The element to check.
 * @returns Returns `true` if the element is a composite component, and `false` otherwise.
 *
 * @example
 * const MyCompositeComponent = (props) => <OtherComponent {...props} />;
 * const CompositeElement = <MyCompositeComponent className="composite" />;
 * console.log(isCompositeTypeElement(CompositeElement)); // outputs: true
 */
export function isCompositeTypeElement(element: unknown): element is React.ReactElement {
  return isElement(element) && typeof element.type === 'function';
}

/**
 * Returns a boolean indicating whether or not the given argument is a forward ref component.
 * A forward ref component is a component created using `React.forwardRef`.
 *
 * @param component The argument to check if it is a forward ref component
 * @returns A boolean indicating whether or not the given argument is a forward ref component
 */
export function isForwardRefComponent(
  component: unknown
): component is React.ForwardRefExoticComponent<unknown> {
  return (
    typeof component === 'object' &&
    component !== null &&
    '$$typeof' in component &&
    typeof component.$$typeof === 'symbol' &&
    component.$$typeof === ForwardRef
  );
}

/**
 * Returns a boolean indicating whether or not the given argument is a valid React node.
 *
 * @param node The argument to check if it is a valid React node
 * @returns A boolean indicating whether or not the given argument is a valid React node
 */
export function isReactNode(node: unknown): node is React.ReactNode {
  return (
    React.isValidElement(node) ||
    (Array.isArray(node) && node.every(isReactNode)) ||
    node == null ||
    typeof node !== 'object'
  );
}

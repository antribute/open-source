import { Children, ReactElement } from 'react';
import { InputAddon } from './InputAddon';
import { notEmpty, objectMap } from 'utils';
import { mapValues } from 'lodash-es';
import { cloneElement } from 'react';
import getDisplayName from 'utils/getDisplayName';
import clsx from 'clsx';
import type { ResolvedInputComponentStateProps } from '../../Input.types';
import type { InputAddonProps } from './InputAddon';
import type { InputAddonGroupProps } from './InputAddonGroup';

export interface InputAddonSlotElement {
  type?: 'div' | 'button';
  filled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export interface UseInputAddonListProps
  extends Pick<InputAddonGroupProps, 'leadingIcon' | 'trailingIcon' | 'loading' | 'size'> {
  inputStateProps?: ResolvedInputComponentStateProps;
  showValidationMessageInTooltip?: boolean;
  children?: React.ReactNode;
  inputRef:
    | React.RefObject<HTMLInputElement>
    | React.ForwardedRef<HTMLInputElement>
    | null
    | undefined;
}

export type InputAddonElement = ReactElement<InputAddonProps>;

export interface InputAddonElements {
  leadingInlineAddons: InputAddonElement[];
  trailingInlineAddons: InputAddonElement[];
  leadingOutsideAddons: InputAddonElement[];
  trailingOutsideAddons: InputAddonElement[];
  leadingIconAddon: React.ReactNode;
  trailingIconAddon: React.ReactNode;
}

type UseInputAddonListReturn = {
  hasLeadingAddons: boolean;
  hasTrailingAddons: boolean;
} & InputAddonElements;

export function useInputAddonList(props: UseInputAddonListProps): UseInputAddonListReturn {
  return findInputIcons(props);
}

type ReducedAddonsData = Omit<InputAddonElements, 'leadingIconAddon' | 'trailingIconAddon'>;

function findInputIcons({
  leadingIcon,
  trailingIcon,
  loading,
  size,
  inputStateProps,
  children,
  inputRef,
  showValidationMessageInTooltip,
}: UseInputAddonListProps): UseInputAddonListReturn {
  const reducedAddons = Children.toArray(children).reduce<ReducedAddonsData>(
    (acc, childNode) => {
      if (!isInputAddon(childNode)) {
        return acc;
      }

      const child: InputAddonElement = {
        ...childNode,
        props: { ...childNode.props, size },
      };

      const { props } = child;

      const { position = 'trailing', grouping = 'inline' } = props;

      if (position === 'leading' && grouping === 'inline') {
        acc.leadingInlineAddons.push(child);
        return acc;
      }

      if (position === 'trailing' && grouping === 'inline') {
        acc.trailingInlineAddons.push(child);
        return acc;
      }

      if (position === 'leading' && grouping === 'outside') {
        acc.leadingOutsideAddons.push(child);
        return acc;
      }

      if (position === 'trailing' && grouping === 'outside') {
        acc.trailingOutsideAddons.push(child);
        return acc;
      }

      return acc;
    },
    {
      leadingInlineAddons: [],
      trailingInlineAddons: [],
      trailingOutsideAddons: [],
      leadingOutsideAddons: [],
    } as ReducedAddonsData
  );

  const { leadingIconAddonProps, trailingIconAddonProps } = mapValues(
    { leadingIconAddonProps: leadingIcon, trailingIconAddonProps: trailingIcon },
    (icon, key) => {
      if (key === 'leadingIconAddonProps' && icon) {
        return {
          grouping: 'inline',
          children: icon,
        } satisfies InputAddonProps;
      }

      if (key === 'trailingIconAddonProps' && icon) {
        return {
          grouping: 'inline',
          position: 'trailing',
          loadingSpinner: loading,
          children: icon,
        } satisfies InputAddonProps;
      }

      if (key === 'trailingIconAddonProps' && loading) {
        return {
          loadingSpinner: loading,
        } satisfies InputAddonProps;
      }

      return undefined;
    }
  );

  const leadingIconAddon: InputAddonElement | undefined = leadingIconAddonProps && (
    <InputAddon {...leadingIconAddonProps} />
  );

  const trailingIconAddon: InputAddonElement | undefined = trailingIconAddonProps && (
    <InputAddon {...trailingIconAddonProps} />
  );

  const { leadingInlineAddons, leadingOutsideAddons, trailingInlineAddons, trailingOutsideAddons } =
    reducedAddons;

  if (inputStateProps?.inputState) {
    trailingInlineAddons.push(
      <InputStateAddon
        inputStateProps={inputStateProps}
        showValidationMessageInTooltip={showValidationMessageInTooltip}
        _inputRef={inputRef}
      />
    );
  }

  const leadingAddons = [...leadingOutsideAddons, leadingIconAddon, ...leadingInlineAddons].filter(
    notEmpty
  );

  const trailingAddons = [
    ...trailingInlineAddons,
    trailingIconAddon,
    ...trailingOutsideAddons,
  ].filter(notEmpty);

  const addons = objectMap(reducedAddons, ({ key, value }) => {
    return [
      key,
      (value as InputAddonElement[]).map((e) => cloneElement(e, { _inputRef: inputRef })),
    ];
  });

  return {
    hasLeadingAddons: Boolean(leadingAddons.length),
    hasTrailingAddons: Boolean(trailingAddons.length),
    ...addons,
    leadingIconAddon,
    trailingIconAddon,
  };
}

const InputStateAddon = ({
  inputStateProps,
  tooltip,
  showValidationMessageInTooltip,
  ...props
}: {
  inputStateProps?: ResolvedInputComponentStateProps;
  showValidationMessageInTooltip?: boolean;
} & InputAddonProps) => {
  const stateClassNames = {
    error: {
      container: 'ring-danger/30',
      text: 'text-danger',
      icon: clsx('i-heroicons-x-circle-20-solid'),
    },
    success: {
      container: 'ring-success/30',
      text: 'text-success',
      icon: clsx('i-heroicons-check-circle-20-solid'),
    },
  };

  const { inputState, validationMessage } = inputStateProps ?? {};

  const hasValidationState = inputState && inputState in stateClassNames;

  const stateClassName = hasValidationState ? stateClassNames[inputState] : undefined;

  return (
    <InputAddon
      grouping="inline"
      position="trailing"
      className="!pr-6"
      excludeFromTabOrder
      focusInputOnClick
      enabled={Boolean(showValidationMessageInTooltip && hasValidationState)}
      tooltip={<span className={clsx(stateClassName?.text)}>{validationMessage}</span>}
      {...props}
    >
      <div
        className={clsx(
          'rounded-full ring  ring-inset flex items-center justify-center',
          stateClassName?.container
        )}
      >
        <div className={clsx('h-18 w-18', stateClassName?.icon, stateClassName?.text)} />
      </div>
    </InputAddon>
  );
};

function isInputAddon(element: unknown): element is InputAddonElement {
  return getDisplayName(element) === 'InputAddon';
}

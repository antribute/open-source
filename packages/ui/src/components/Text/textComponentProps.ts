import type { TextProps } from 'components/Text/Text';

export type TextComponentType = keyof typeof textComponentProps;

export const textComponentProps = {
  overline: {
    size: 'sm',
    leading: 'md',
    color: 'subtle',
    fontWeight: 'regular',
    maxLines: 2,
    className: undefined,
  },

  heading: {
    size: 'h3',
    color: 'intense',
    leading: 'h3',
    fontWeight: 'bold',
    className: undefined,
  },
  subheading: {
    size: 'lg',
    leading: 'lg',
    color: 'intense',
    className: undefined,
    fontWeight: 'medium',
  },
  title: {
    size: 'md',
    color: 'intense',
    leading: 'md',
    fontWeight: 'medium',
    maxLines: 2,
    className: undefined,
  },
  subtitle: {
    size: 'md',
    leading: 'md',
    font: 'body',
    fontWeight: 'regular',
    color: 'medium',
    className: 'relative',
  },
  body: {
    size: 'md',
    color: 'weak',
    leading: 'md',
    fontWeight: 'regular',
    className: undefined,
    font: 'body',
    // maxLines: 3,
  },
  description: {
    size: 'sm',
    color: 'subtle',
    leading: 'md',
    fontWeight: 'regular',
    className: undefined,
    font: 'body',
    // maxLines: 3,
  },
  caption: {
    size: 'sm',
    color: 'ghost',
    leading: 'md',
    className: undefined,
  },
} satisfies Partial<Record<string, Partial<TextProps> & { className: undefined | string }>>;

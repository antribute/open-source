import { ComponentProps, classed, deriveClassed } from '@tw-classed/react';

const ButtonBase = classed.button({
  base: 'px-2 py-4 flex items-center gap-2',
  variants: {
    color: {
      blue: 'bg-blue-500 text-white',
      red: 'bg-red-500 text-white',
    },
  },
});

export type ButtonProps = ComponentProps<typeof ButtonBase> & {
  icon?: React.ReactNode; // Add an icon
};

export const Button = deriveClassed<typeof ButtonBase, ButtonProps>(
  ({ children, icon, ...rest }, ref) => {
    return (
      <ButtonBase {...rest} ref={ref}>
        {icon && <span>{icon}</span>}
        <span>{children}</span>
      </ButtonBase>
    );
  }
);

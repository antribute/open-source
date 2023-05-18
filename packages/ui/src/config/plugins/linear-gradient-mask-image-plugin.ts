import plugin from 'tailwindcss/plugin';

export function linearGradientMaskImagePlugin() {
  return plugin(({ addUtilities }) => {
    const directions = {
      t: 'to top',
      tr: 'to top right',
      r: 'to right',
      br: 'to bottom right',
      b: 'to bottom',
      bl: 'to bottom left',
      l: 'to left',
      tl: 'to top left',
    } as const;

    const steps = [
      '0',
      '2',
      '5',
      '10',
      '15',
      '20',
      '25',
      '30',
      '35',
      '40',
      '45',
      '50',
      '55',
      '60',
      '65',
      '70',
      '75',
      '80',
      '85',
      '90',
      '95',
      '98',
    ] as const;

    const utilities = Object.entries(directions).reduce((result, [shorthand, direction]) => {
      const gradientMaskClassEntries = steps.map((step) => {
        const className = `.gradient-mask-${shorthand}-${step}`;
        return [
          className,
          {
            maskImage: `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) ${step}%, transparent 100%)`,
          },
        ] as const;
      });

      const stepClasses = Object.fromEntries(gradientMaskClassEntries);

      return {
        ...result,
        ...stepClasses,
      };
    }, {});

    addUtilities(utilities);
  });
}
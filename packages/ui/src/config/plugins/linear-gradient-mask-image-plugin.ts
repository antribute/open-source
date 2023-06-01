import plugin from 'tailwindcss/plugin';

export function linearGradientMaskImagePlugin() {
  function xyMaskFn(direction: 'x' | 'y') {
    return ({ step }: { step: number }) =>
      `linear-gradient(${
        direction === 'x' ? 'to right' : 'to bottom'
      }, transparent, black ${step}%, black ${100 - step}%, transparent)`;
  }

  function vectorMaskFn(direction: string) {
    return ({ step }: { step: number }) =>
      `linear-gradient(${direction}, rgba(0, 0, 0, 1.0) ${step}%, transparent 100%)`;
  }

  return plugin(({ addUtilities }) => {
    const directions = {
      x: xyMaskFn('x'),
      y: xyMaskFn('y'),
      t: vectorMaskFn('to top'),
      tr: vectorMaskFn('to top right'),
      r: vectorMaskFn('to right'),
      br: vectorMaskFn('to bottom right'),
      b: vectorMaskFn('to bottom'),
      bl: vectorMaskFn('to bottom left'),
      l: vectorMaskFn('to left'),
      tl: vectorMaskFn('to top left'),
    } as const;

    const steps = [
      0, 2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 98,
    ] as const;

    const utilities = Object.entries(directions).reduce((result, [shorthand, imageMaskFn]) => {
      const gradientMaskClassEntries = steps.map((step) => {
        const className = `.gradient-mask-${shorthand}-${step}`;
        return [
          className,
          {
            maskImage: imageMaskFn({ step }),
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

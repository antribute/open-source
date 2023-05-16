import plugin from 'tailwindcss/plugin';
import { variousColors } from '../../colors/variousColors';
import { colorSchemeBaseTokens } from '../../colors/color-schemes';
import {
  classComponent,
  // classComponent,
  classComponentMap,
  classComponentPreset,
  classComponents,
} from './custom-classes-plugin.helpers';
import { clsx, prefix } from './class-style-utils';
import {
  generateTwGradientClasses,
  baseTokensWithLightAndDarkColors,
  twGradient,
} from './tw-gradient-helpers';

export function customClassesPlugin() {
  return plugin(({ addComponents: addComponentsFn, theme }) => {
    // Filled Accent
    addComponents({
      ...classComponentMap(colorSchemeBaseTokens, (k) => {
        return {
          name: prefix('filled-accent', k),
          className: clsx(`bg-${k} text-palette-white`),
        };
      }),

      ...classComponentMap(variousColors, (key) => {
        return {
          name: prefix('filled-accent', key),
          className: clsx(`bg-palette-${key} text-palette-white`),
        };
      }),

      ...classComponentPreset(prefix('filled-accent'), {
        primary: clsx('bg-primary text-primary-content'),
        secondary: clsx('bg-secondary text-secondary-content'),
        inverse: clsx('bg-inverse text-inverse-content-max-contrast'),
      }),

      ...classComponents({
        'gradient-primary': clsx(
          'bg-gradient-to-r from-primary-dark to-primary-light text-primary-content '
        ),
        'gradient-secondary': clsx(
          'bg-gradient-to-r from-secondary-dark to-secondary-light text-secondary-content '
        ),
        'gradient-inverse': clsx(
          'bg-gradient-to-r from-inverse-dark to-inverse-light text-inverse-content-max-contrast '
        ),
        'gradient-heart': clsx(
          'bg-gradient-to-r from-heart-dark to-heart-light text-palette-white '
        ),
        'gradient-info': clsx('bg-gradient-to-r from-info-dark to-info-light text-palette-white '),
        'gradient-success': clsx(
          'bg-gradient-to-r from-success-dark to-success-light text-palette-white '
        ),
        'gradient-caution': clsx(
          'bg-gradient-to-r from-caution-dark to-caution-light text-palette-white '
        ),
        'gradient-danger': clsx(
          'bg-gradient-to-r from-danger-dark to-danger-light text-palette-white '
        ),
      }),
    });

    addComponents(
      classComponentPreset('filled-hover-accent-', {
        primary: 'hover:bg-primary-dark',
        secondary: 'hover:bg-secondary-dark',
        inverse: 'hover:bg-inverse-light',
        heart: 'hover:bg-heart-dark',
        info: 'hover:bg-info-dark',
        success: 'hover:bg-success-dark',
        caution: 'hover:bg-caution-dark',
        danger: 'hover:bg-danger-dark',
      })
    );

    // Outlined Accent
    addComponents(
      classComponentPreset('outlined-accent-', {
        primary:
          'bg-surface-soft hover:bg-surface-dark/30 text-primary-content-min-contrast ring-boundary-moderate',
        secondary:
          'bg-surface-soft hover:bg-surface-dark/30 text-secondary-content-min-contrast ring-boundary-moderate',
        inverse: 'bg-surface-soft hover:bg-surface-dark/30 text-inverse ring-inverse',
        heart: 'bg-surface-soft hover:bg-surface text-heart ring-heart hover:ring-heart-dark',
        info: 'bg-surface-soft hover:bg-surface text-info ring-info hover:ring-info-dark',
        success:
          'bg-surface-soft hover:bg-surface text-success ring-success hover:ring-success-dark',
        caution:
          'bg-surface-soft hover:bg-surface text-caution ring-caution hover:ring-caution-dark',
        danger: 'bg-surface-soft hover:bg-surface text-danger ring-danger hover:ring-danger-dark',
      })
    );

    // Glass Accent
    addComponents(
      classComponentPreset('glass-accent-', {
        primary: 'bg-primary/40 text-content-intense hover:bg-highlight-strong',
        secondary: 'bg-highlight-weak text-content-max-contrast hover:bg-highlight-moderate',
        inverse: 'bg-inverse/30 text-palette-white hover:bg-inverse/40',
        heart: 'bg-heart/10 hover:bg-heart/20 text-heart',
        info: 'bg-info/10 hover:bg-info/20 text-info',
        success: 'bg-success/10 hover:bg-success/20 text-success',
        caution: 'bg-caution/10 hover:bg-caution/20 text-caution contrast-[.85]',
        danger: 'bg-danger/10 hover:bg-danger/20 text-danger',
      })
    );

    // Ghost Accent

    addComponents(
      classComponentPreset('ghost-accent-', {
        primary: 'text-content-strong hover:bg-highlight-weak',
        secondary: 'text-content-weak hover:bg-highlight-weak',
        inverse: 'text-inverse hover:bg-highlight-weak',
        heart: 'text-heart hover:bg-heart/20',
        info: 'text-info hover:bg-info/20',
        success: 'text-success hover:bg-success/20',
        caution: 'text-caution hover:bg-caution/20 contrast-[.85]',
        danger: 'text-danger hover:bg-danger/20',
      })
    );

    // Light to Dark Gradient

    addComponents(
      generateTwGradientClasses(baseTokensWithLightAndDarkColors({ theme }), {
        gradientName: 'dark-to-light',
        gradient: ({ color, dir }) =>
          twGradient({ dir, fromColor: `${color}-dark`, toColor: `${color}-light` }),
      })
    );

    // Textures

    addClassComponent('noisy-surface-texture', 'before:noisy-texture before-absolute-content');

    addClassComponent(
      'noisy-texture',
      "bg-[url('https://liveblocks.io/images/noise.png')] bg-repeat bg-[length:125px] opacity-[0.015]"
    );

    // Utilities

    addClassComponent(
      'absolute-center',
      'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    );

    addClassComponent(
      'before-absolute-content',
      "before:content-[''] before:absolute before:w-full before:h-full before:pointer-events-none before:inset-0"
    );

    addClassComponent(
      'after-absolute-content',
      "after:content-[''] after:absolute after:w-full after:h-full after:pointer-events-none after:inset-0"
    );

    addClassComponent('inherit-grid-template-areas', '[grid-template-areas:inherit]');

    // Helpers

    function addClassComponent(name: string, twClassName: string) {
      addComponents(classComponent(name, twClassName));
    }

    type AddComponentsFnParams = Parameters<typeof addComponentsFn>;

    function addComponents(
      p0: AddComponentsFnParams[0],
      options?: AddComponentsFnParams[1] & { debug?: boolean }
    ) {
      const { debug, ...p1 } = options ?? {};

      if (debug) {
        // eslint-disable-next-line no-console
        console.log(p0);
      }
      addComponentsFn(p0, p1);
    }
  });
}

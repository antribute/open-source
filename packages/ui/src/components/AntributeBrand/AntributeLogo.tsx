import { classed } from '@tw-classed/react';
import { twMerge } from 'tailwind-merge';

export const AntributeLogo = ({
  className,
  height,
  style,
  children,
  ...props
}: { height?: string | number } & React.ComponentProps<typeof AntributeLogoContainerElement>) => (
  <AntributeLogoContainerElement {...props} style={{ height, width: height, ...style }}>
    {children ?? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="100%"
        width="100%"
        fill="none"
        viewBox="0 0 256 256"
        className={twMerge(className, 'ring-[1.5px] rounded-full gradient-mask-t-80')}
      >
        <g mask="url(#backgroundPath)">
          <path
            fill="url(#backgroundPath)"
            // className="fill-palette-content-inverse-weak"
            className="fill-palette-white/20"
            d="M144.643 176.25c0 22.041 1.048 34.983.315 39.902-.123.827-.87 1.348-1.707 1.348h-30.807c-1.104 0-2-.892-2-1.997-.003-4.551-.013-12.502-.034-17.363-.02-4.577-1.369-10.841-3.205-14.879-2.195-4.827-12.099-15.92-32.187-36.05l-52.356-44.295a2 2 0 0 1-.12-2.943l10.466-10.434 10.735-10.7a2 2 0 0 1 2.673-.136l43.815 35.594 16.803 16.713c1.261 1.255 3.41.361 3.41-1.418V21a2 2 0 0 1 2-2h30.199a2 2 0 0 1 2 2v63.653c0 1.78 2.149 2.673 3.41 1.418l16.439-16.351 18.434-18.335a2 2 0 0 1 2.827.006l10.171 10.207 10.177 10.213a2 2 0 0 1 .001 2.822l-26.735 26.877c-15.477 15.558-29.425 30.729-30.998 33.712-2.434 4.616-2.879 10.688-3.726 41.028Z"
          />
          <path
            fill="url(#foregroundPath)"
            className="fill-palette-various-gray-50"
            d="M144.643 62c0-22.83 1.124-68.68.23-77.648-.083-.832-.785-1.352-1.622-1.352h-30.807c-1.104 0-2 .882-2 1.986-.002 9.922-.011 49.941-.034 55.123-.02 4.578-1.369 10.842-3.205 14.88-2.195 4.827-12.099 15.92-32.187 36.05l-52.356 44.295a2 2 0 0 0-.12 2.943l10.466 10.434 10.735 10.701a2.001 2.001 0 0 0 2.673.136l43.815-35.596 16.803-16.712c1.261-1.255 3.41-.362 3.41 1.418V217.25a2 2 0 0 0 2 2h30.199a2 2 0 0 0 2-2v-63.653c0-1.779 2.149-2.673 3.41-1.418l16.439 16.351 18.434 18.335a2 2 0 0 0 2.827-.006l10.171-10.207 10.177-10.213a2 2 0 0 0 .001-2.822l-26.735-26.877c-15.477-15.559-29.425-30.729-30.998-33.712-2.434-4.617-2.879-10.688-3.726-41.028Z"
          />
        </g>
      </svg>
    )}
  </AntributeLogoContainerElement>
);

const AntributeLogoContainerElement = classed(
  'div',
  'relative',
  'bg-palette-black/90',
  'ring-2',
  'ring-palette-gray-300 dark:ring-content-moderate',
  'noisy-surface-texture before:opacity-[0.09]',
  'rounded-full overflow-hidden'
);

// interface SvgGradientStopProp {
//   offset?: number;
//   color: string;
//   opacity?: number;
// }

// const SvgGradientStops = ({ stops }: { stops: SvgGradientStopProp[] }) => {
//   function getOffset({ stop, index }: { stop: SvgGradientStopProp; index: number }) {
//     const { offset } = stop;
//     if (offset) {
//       return `${offset}%`;
//     }
//     if (index === 0) {
//       return '0%';
//     }
//     if (index === stops.length) {
//       return `100%`;
//     }

//     return `${index * (100 / (stops.length - 1))}%`;
//   }

//   return (
//     <>
//       {stops.map((stop, index) => {
//         const { color, opacity } = stop;

//         const style = {
//           stopColor: color,
//           stopOpacity: opacity ?? 1,
//         };

//         return <stop key={index} offset={getOffset({ stop, index })} style={style} />;
//       })}
//     </>
//   );
// };

// interface SvgLinearGradientProps {
//   id: string;
//   rotateGradient?: number;
//   stops: SvgGradientStopProp[];
// }

// const SvgLinearGradient = ({ id, stops, rotateGradient }: SvgLinearGradientProps) => {
//   return (
//     <linearGradient
//       id={id}
//       x1="0%"
//       x2="100%"
//       y1="0%"
//       y2="0%"
//       gradientUnits="userSpaceOnUse"
//       gradientTransform={`rotate(${rotateGradient ?? 25})`}
//     >
//       <SvgGradientStops stops={stops} />
//     </linearGradient>
//   );
// };

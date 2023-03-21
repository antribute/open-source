import Image, { ImageProps } from 'next/image';

export const AntributeLogo = (props: Omit<ImageProps, 'src' | 'alt'>) => {
  return <Image alt="Antribute Logo" height="80" width="80" src="/icon.png" {...props} />;
};

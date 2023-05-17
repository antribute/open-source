import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { Text } from 'components/Text';
import { classed } from 'utils/classed';

const Link = classed(
  NavigationMenuPrimitive.Link,
  // 'flex flex-col gap-4  justify-center',
  'w-full p-8 hover:bg-surface-light/50 dark:hover:bg-surface-inverse-light/50 rounded-md',
  'text-left block',
  'focus:outline-none',
  { variants: {} }
);

type ContentLinkProps = {
  title: string;
  description: string;
} & NavigationMenuPrimitive.PrimitiveLinkProps;

export const NavigationMenuContentLink = ({ title, description }: ContentLinkProps) => {
  return (
    <Link href="https://www.radix-ui.com">
      <Text size="sm" fontWeight="medium" color="strong">
        {title}
      </Text>
      <Text as="div" size="xs" color="weak">
        {description}
      </Text>
    </Link>
  );
};

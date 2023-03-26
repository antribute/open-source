import { NavigationMenu } from '.';

const features = [
  {
    title: 'Type Safety',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Price Modeling',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Feature Flagging',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Roll-outs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

export const NavMenuExample = () => (
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Features</NavigationMenu.Trigger>

        <NavigationMenu.Content className="max-w-512 grid grid-cols-[repeat(auto-fill,minmax(theme(width.200),1fr))] gap-8 p-8">
          {features.map((e) => (
            <NavigationMenu.ContentLink className="" title={e.title} description={e.description} />
          ))}

          {/* </div> */}
        </NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Docs</NavigationMenu.Trigger>
        <NavigationMenu.Content>...</NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Demo</NavigationMenu.Trigger>
        <NavigationMenu.Content>...</NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Integrations</NavigationMenu.Trigger>
        <NavigationMenu.Content>...</NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger>Pricing</NavigationMenu.Trigger>
        <NavigationMenu.Content>...</NavigationMenu.Content>
      </NavigationMenu.Item>
      <NavigationMenu.Item>
        <NavigationMenu.Link className="">Login</NavigationMenu.Link>
      </NavigationMenu.Item>
    </NavigationMenu.List>
  </NavigationMenu.Root>
);

export const Default = () => {
  return <NavMenuExample />;
};

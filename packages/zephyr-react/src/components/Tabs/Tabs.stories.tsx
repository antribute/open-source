import { Tabs } from '.';

const tabs = [
  { label: 'One', value: 'A' },
  { label: 'Two', value: 'B' },
  { label: 'Three', value: 'C' },
];

const tabViews = [
  { label: 'One', value: 'A' },
  { label: 'Two', value: 'B' },
  { label: 'Three', value: 'C' },
];

export const Default = () => {
  return (
    <Tabs.Root defaultValue="A">
      <Tabs.List className="mb-8">
        {tabs.map((e) => (
          <Tabs.Tab value={e.value}>{e.label}</Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.View value={tab.value}>
          Tab View: <b>{tab.label}</b>
        </Tabs.View>
      ))}
    </Tabs.Root>
  );
};

export const Vertical = () => {
  return (
    <Tabs.Root defaultValue="A" className="flex">
      <Tabs.List className="mr-8" orientation="vertical">
        {tabs.map((e) => (
          <Tabs.Tab value={e.value}>{e.label}</Tabs.Tab>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.View value={tab.value}>
          Tab View: <b>{tab.label}</b>
        </Tabs.View>
      ))}
    </Tabs.Root>
  );
};

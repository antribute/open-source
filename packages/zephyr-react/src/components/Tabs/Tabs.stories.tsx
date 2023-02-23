import { Paper } from 'components/Paper';
import { Tabs } from '.';

const tabs = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' },
];

const tabs6 = [
  { label: 'Home', value: 'home' },
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'passowrd' },
  { label: 'Details', value: 'details' },
  { label: 'Billing', value: 'billing' },
  { label: 'Projects', value: 'projects' },
];

export const Default = () => {
  return (
    <Paper border>
      <Tabs.Root defaultValue={tabs[0]?.value}>
        <Tabs.List className="mb-8">
          {tabs.map((e) => (
            <Tabs.Tab key={e.value} value={e.value}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <div>
          {tabs.map((tab) => (
            <Tabs.View value={tab.value}>
              Tab View: <b>{tab.label}</b>
            </Tabs.View>
          ))}
        </div>
      </Tabs.Root>
    </Paper>
  );
};

export const Many = () => {
  return (
    <Paper border color="surface-dark">
      <Tabs.Root defaultValue={tabs6[0]?.value}>
        <Tabs.List className="mb-8">
          {tabs6.map((e) => (
            <Tabs.Tab key={e.value} value={e.value}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Paper>
  );
};

// TODO
export const Vertical = () => {
  return (
    <Tabs.Root className="flex">
      TODO 🚧
      <Tabs.List className="mr-8">
        {tabs.map((e) => (
          <Tabs.Tab key={e.value} value={e.value}>
            {e.label}
          </Tabs.Tab>
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

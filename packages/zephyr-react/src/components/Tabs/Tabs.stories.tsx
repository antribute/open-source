import { Paper } from 'components/Paper';
import { generateMockVehicleList } from 'mock/mock-data';
import { Text } from 'components/Text';
import { capitalCase } from 'change-case';
import { RenderPaperContainers } from 'utils/storybook-utils';
import { Tabs } from '.';

const tabs2 = [
  { label: 'Account', value: 'account' },
  { label: 'Password', value: 'password' },
];
const tabs3 = [...tabs2, { label: 'Home', value: 'home' }];

const tabs4 = [...tabs3, { label: 'Projects', value: 'projects' }];

const tabs6 = [
  ...tabs4,
  { label: 'Password', value: 'passowrd' },
  { label: 'Billing', value: 'billing' },
];

export const Default = () => {
  return (
    <RenderPaperContainers border>
      <Tabs.Root defaultValue={tabs2[0]?.value}>
        <Tabs.List>
          {tabs2.map((e) => (
            <Tabs.Tab key={e.value} value={e.value}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.ViewContainer>
          {tabs2.map((tab) => (
            <Tabs.View value={tab.value}>
              Tab View: <b>{tab.label}</b>
            </Tabs.View>
          ))}
        </Tabs.ViewContainer>
      </Tabs.Root>
    </RenderPaperContainers>
  );
};

export const SixTabs = () => {
  return (
    <Paper border color="surface-dark">
      <Tabs.Root defaultValue={tabs6[0]?.value}>
        <Tabs.List>
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

export const DisabledTab = () => {
  return (
    <Paper border color="surface-dark">
      <Tabs.Root defaultValue={tabs6[0]?.value}>
        <Tabs.List>
          {tabs4.map((e, index, arr) => (
            <Tabs.Tab key={e.value} value={e.value} disabled={index === arr.length - 1}>
              {e.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Paper>
  );
};

export const Vertical = () => {
  return (
    <Tabs.Root orientation="vertical">
      <Tabs.List>
        {tabs2.map((e) => (
          <Tabs.Tab key={e.value} value={e.value}>
            {e.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Tabs.ViewContainer>
        {tabs2.map((tab) => (
          <Tabs.View key={tab.value} value={tab.value}>
            Tab View: <b>{tab.label}</b>
          </Tabs.View>
        ))}
      </Tabs.ViewContainer>
    </Tabs.Root>
  );
};

const vehicles = generateMockVehicleList({ size: 20, uniqueBy: 'type' });

export const Overflow = () => {
  return (
    <Paper border>
      <Tabs.Root defaultValue={tabs6[0]?.value}>
        <Tabs.List>
          {vehicles.map(({ type }) => (
            <Tabs.Tab key={type} value={type}>
              {type}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </Paper>
  );
};

export const Contrast = () => {
  return (
    <div className="flex">
      <RenderPaperContainers>
        <Tabs.Root defaultValue={tabs6[0]?.value}>
          <Tabs.List>
            {tabs3.map((e) => (
              <Tabs.Tab key={e.value} value={e.value}>
                {e.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </RenderPaperContainers>
    </div>
  );
};

import { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Alert, AlertProps } from './Alert';

const meta = {
  args: {},
  title: 'Feedback/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div className="p-8 bg-surface rounded-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const loremIpsum =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam. Incididunt nostrud minim incididunt incididunt non consequat. Nulla dolore aliquip qui minim incididunt non in. Nostrud commodo cupidatat mollit exercitation in fugiat consequat est. Consectetur est laborum ea quis aute in tempor minim amet duis. Sit irure anim duis culpa. Elit ea est dolore ullamco minim ex esse do. In et eu do nostrud enim proident esse enim dolore. ';

const alertsProps = (
  [
    {
      variant: 'inverse',
      title: 'Call to action',
    },
    {
      variant: 'secondary',
      title: 'Action items',
    },
    {
      variant: 'success',
      title: 'Successfully uploaded',
    },
    {
      variant: 'info',
      title: 'A new software update is available. See what’s new in version 2.0.4.',
    },
    {
      variant: 'danger',
      title: 'There were 2 errors with your submission',
    },
    {
      variant: 'caution',
      title: 'You have no credits left. Upgrade your account to add more credits.',
    },
    {
      variant: 'heart',
      title: 'Somebody liked your post',
    },
  ] as AlertProps[]
).map((props): AlertProps => {
  return {
    ...props,
    description: loremIpsum,
  };
});

const AlertsMock = (props: AlertProps) => {
  const initialAlerts = alertsProps.map((e) => ({ ...e, ...props }));
  const [alerts, setAlerts] = useState(initialAlerts);

  function closeAlert(variant: AlertProps['variant']) {
    setAlerts(alerts.filter((e) => e.variant !== variant));
  }

  useEffect(() => {
    if (alerts.length === 0) {
      setAlerts(initialAlerts);
    }
  }, [alerts, initialAlerts]);

  return (
    <div className="flex flex-col gap-16">
      {alerts.map((alert, i) => {
        return (
          <Alert
            {...alert}
            {...props}
            key={i}
            onDiscardClick={
              props.onDiscardClick
                ? () => {
                    closeAlert(alert.variant);
                    props.onDiscardClick?.();
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  );
};

export const Default: Story = {
  args: {},
  render: () => {
    return <AlertsMock />;
  },
};

export const Discard: Story = {
  args: {},
  render: () => {
    return <AlertsMock onDiscardClick={() => {}} />;
  },
};

export const ActionButton: Story = {
  args: {},
  render: () => {
    return (
      <AlertsMock
        onDiscardClick={() => {}}
        actionButtonText="View"
        onActionButtonClick={() => {}}
      />
    );
  },
};

export const WithoutIcon: Story = {
  args: {},
  render: () => {
    return <AlertsMock icon={null} actionButtonText="View" onActionButtonClick={() => {}} />;
  },
};
export const Body: Story = {
  args: {},
  render: () => {
    return (
      <AlertsMock
        icon={null}
        description={null}
        actionButtonText="View"
        body="Amet nostrud commodo officia anim magna ullamco dolor. Labore est mollit in irure. Incididunt labore do veniam sunt dolor pariatur laboris veniam irure voluptate sint consequat. Aute elit tempor in sunt nulla est."
        onActionButtonClick={() => {}}
      />
    );
  },
};

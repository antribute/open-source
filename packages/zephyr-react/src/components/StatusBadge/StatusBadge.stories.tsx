import { RenderColorVariants, RenderSizeVariants } from 'utils/storybook-utils';
import { generateMockUser, generateMockUserList } from 'mock/mock-data';
import { useState } from 'react';
import { StatusBadge } from './StatusBadge';

export const Default = () => {
  return <RenderColorVariants Component={StatusBadge} props={{ children: 'Default' }} />;
};

export const Outlined = () => {
  return (
    <RenderColorVariants
      Component={StatusBadge}
      props={{ children: 'Default', variant: 'outlined' }}
    />
  );
};

export const Discard = () => {
  const initialStatuses = ['Pending', 'Cleared', 'Archived', 'In Progress'];
  const [statuses, setStatuses] = useState(initialStatuses);

  const canReset = statuses.length !== initialStatuses.length;

  return (
    <div className="space-x-8">
      <StatusBadge
        color="neutral"
        onClick={() => {
          setStatuses(initialStatuses);
        }}
        disabled={!canReset}
      >
        Reset
      </StatusBadge>
      {statuses.map((status) => (
        <StatusBadge
          key={status}
          onDiscard={() => {
            const filtered = statuses.filter((e) => e !== status);
            setStatuses(filtered);
          }}
        >
          {status}
        </StatusBadge>
      ))}
    </div>
  );
};

export const Sizes = () => {
  return <RenderSizeVariants Component={StatusBadge} props={{ children: 'Default' }} />;
};

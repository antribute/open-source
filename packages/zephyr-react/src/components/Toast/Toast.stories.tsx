import { Button } from 'components/Button';

import { ToastItem } from 'components/Toast/Toast.types';
import { useState } from 'react';
import { Checkbox } from 'components/Checkbox';
import { capitalCase } from 'change-case';
import { ToastAction, Toaster, toast } from '.';

function addManyToasts(props: ToastItem, count = 6) {
  new Array(count).fill(0).forEach(() => {
    toast(props);
  });
}

const toasts: Record<string, ToastItem> = {
  exampleToast: {
    title: 'Example Toast',
  },
  dangerToast: {
    title: 'Error',
    description: 'Something went wrong',
    variant: 'danger',
  },
  dangerToastAction: {
    title: 'Error ',
    description: 'Something went wrong',
    variant: 'danger',
    action: { altText: 'Retry', children: 'Retry' },
  },
  actionToast: {
    title: 'Action Toast',
    action: {
      altText: 'Read',
      children: 'Read',
      color: 'primary',
    },
  },
  actionToastDelay: {
    title: 'Action Toast w/ Delay',
    duration: 2000,
    action: {
      altText: 'Read',
      children: 'Click Me',
      color: 'primary',
    },
  },
  twoActionsToast: {
    title: 'Multi Action Toast',
    action: [
      {
        altText: 'Read',
        children: 'Read',
        color: 'primary',
      },
      {
        altText: 'Dismiss',
        children: 'Dismiss',
        color: 'primary',
      },
    ],
  },
  threeActionsToast: {
    title: 'Multi Action Toast',
    action: [
      {
        altText: 'Read',
        children: 'Read',
        color: 'primary',
      },
      {
        altText: 'Save',
        children: 'Save',
        color: 'secondary',
      },
      {
        altText: 'Archive',
        children: 'Archive',
        color: 'secondary',
      },
    ],
  },
};

export const Default = () => {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <div className="relative flex w-full flex-wrap items-center gap-16">
      {Object.entries(toasts).map(([key, { title, description, ...props }], index) => {
        return (
          <Button
            rounded
            key={index}
            onClick={() => {
              toast({
                description:
                  showDescription &&
                  (description ?? 'Lorem dolor commodo mollit qui laborum nisi aute elit.'),
                ...props,
                title,
              });
            }}
          >
            {capitalCase(key)}
          </Button>
        );
      })}
      <Checkbox
        label="Show Description"
        onCheckedChange={(e) => {
          setShowDescription(Boolean(e));
        }}
      />
      <Toaster />
    </div>
  );
};

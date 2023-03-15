import { Button } from 'components/Button';

import { ToastAction, Toaster, toast } from '.';

export const Default = () => {
  return (
    <div className="relative  w-full">
      <Button
        onClick={() => {
          toast({
            title: 'My Toast',
            description: 'Something toast',
            duration: 2000,
            action: {
              altText: 'Undo',
              onClick: () => {
                console.log('Undo');
              },
              children: 'Undo',
            },
          });
        }}
      >
        Add Undo Toast
      </Button>
      <Button
        onClick={() => {
          toast({
            title: 'My Toast',
            description: 'Something toast',
            duration: 2000,
            variant: 'danger',
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
            ],
          });
        }}
      >
        Add Muti Action Toast
      </Button>
      <Toaster />
    </div>
  );
};

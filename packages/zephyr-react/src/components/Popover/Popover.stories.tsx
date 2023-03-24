import { Button } from 'components/Button';
import { Popover } from 'components/Popover';

export const Default = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Button</Button>
      </Popover.Trigger>
      <Popover.Content>Hello</Popover.Content>
    </Popover.Root>
  );
};

export const KeepOpen = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Button</Button>
      </Popover.Trigger>
      <Popover.Content closeOnInteractOutside={false}>Persist</Popover.Content>
    </Popover.Root>
  );
};

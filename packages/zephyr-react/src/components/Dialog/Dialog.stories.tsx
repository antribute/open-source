import { Button } from 'components/Button';
import { Dialog } from '.';

export const Default = () => {
  return (
    <Dialog.Root>
      <Dialog.TriggerButton>Open</Dialog.TriggerButton>
      <Dialog.Content>
        <Dialog.Title>Dialog Title</Dialog.Title>
        <Dialog.Body>
          <Dialog.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec placerat sem.
            Curabitur laoreet mattis odio eget posuere. Nam mauris urna, dapibus id tincidunt sed,
            tempus nec arcu. Etiam condimentum purus eget libero suscipit, ultrices elementum velit
            aliquam. Nunc in blandit dolor. Donec mauris mauris, pulvinar ut eros eget, consequat.
          </Dialog.Description>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close color="danger" variant="outlined">
            Cancel
          </Dialog.Close>

          <Dialog.Button>Submit</Dialog.Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

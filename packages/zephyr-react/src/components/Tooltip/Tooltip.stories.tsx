import { Button } from 'components/Button';
import { Tooltip } from './Tooltip';

export const Default = () => {
  return (
    <Tooltip tooltip="Hello">
      <Button>Hover Me</Button>
    </Tooltip>
  );
};

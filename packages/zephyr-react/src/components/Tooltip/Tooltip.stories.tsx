import { Button } from 'components/Button';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { Text } from 'components/Text';
import { InfoTooltipIcon, Tooltip } from './Tooltip';

const Content = () => {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className="TooltipContent" sideOffset={5}>
        Add to library
        <TooltipPrimitive.Arrow className="TooltipArrow" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
};
export const Default = () => {
  return (
    <div>
      <Tooltip tooltip="Hello">
        <Button>Hover Me</Button>
      </Tooltip>
      <Tooltip tooltip="Hello">
        <button>hello</button>
      </Tooltip>
    </div>
  );
};

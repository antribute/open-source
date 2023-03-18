import { Paper } from 'components/Paper';
import { Position } from 'components/Position/Position';
import { PositionProp } from 'types/styles';

const positionPropMap: Record<PositionProp, undefined> = {
  'top-center': undefined,
  'top-left': undefined,
  'top-right': undefined,
  'middle-center': undefined,
  'middle-left': undefined,
  'middle-right': undefined,
  'bottom-center': undefined,
  'bottom-left': undefined,
  'bottom-right': undefined,
};

const positions = Object.keys(positionPropMap) as PositionProp[];

export const Default = () => {
  return (
    <Paper>
      {positions.map((position) => {
        return (
          <Position
            className="bg-surface-soft font-body text-content rounded-full p-px px-2 text-center text-xs leading-none"
            position={position}
          >
            {position}
          </Position>
        );
      })}
    </Paper>
  );
};

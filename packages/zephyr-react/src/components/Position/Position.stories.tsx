import { Flex } from 'components/Flex';
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
    <Flex centerAlign className="w-full h-screen pb-[20%]">
      <div className="h-400 w-400 bg-surface relative">
        {positions.map((position) => {
          return (
            <Position
              className="bg-surface-light text-content rounded-full p-px px-4 text-center text-xs"
              position={position}
            >
              {position}
            </Position>
          );
        })}
      </div>
    </Flex>
  );
};

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
    <div className="relative w-160 h-160 bg-gray-100 border border-gray-200 rounded-lg dark:bg-light-gray-light dark:border-gray-dark">
      {positions.map((position) => {
        return (
          <Position
            className="bg-primary-soft text-xs font-medium text-primary text-center p-0.5 leading-none rounded-full px-2"
            position={position}
          >
            {position}
          </Position>
        );
      })}
    </div>
  );
};

import { colors } from '@antribute/zephyr-core';
import { color } from '@storybook/theming';
import { capitalCase } from 'change-case';
import { Paper } from 'components/Paper';
import { StatusBadge } from 'components/StatusBadge';
import { Text } from 'components/Text';

export const Colors = () => {
  const colorList = getColorGroupArray();
  console.log('COLOR LIST', colorList);
  return (
    <div className="space-y-16 p-8">
      {colorList.map(({ colorName, colorList }) => (
        <ColorGroupContainer title={colorName}>
          {colorList.map(({ color, colorName }) => (
            <ColorBlock key={color as string} label={colorName} color={color as string} />
          ))}
        </ColorGroupContainer>
      ))}
    </div>
  );
};

const ColorBlock = ({ label, color }: { label: string; color: string }) => {
  return (
    <div>
      <div className="pb-8 text-md  text-content-weak  dark:text-content-inverse-weak ">
        <span className="mr-8"> {label}:</span>
        <span className="text-center text-sm">{color}</span>
      </div>
      <div
        className="relative flex  h-104 w-104 shrink-0 items-center justify-center rounded-md text-white shadow-sm "
        style={{ background: color }}
      />
    </div>
  );
};

const ColorGroupContainer = ({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <Paper border className="w-full pb-24">
      {title && (
        <div className="flex  select-none gap-16 pb-16 font-body font-bold text-content-intense dark:text-content-inverse-intense">
          <div> {capitalCase(title)} </div>
          <StatusBadge size="xs" color="surface">
            {title}
          </StatusBadge>
        </div>
      )}
      <div className="flex flex-wrap gap-24">{children}</div>
    </Paper>
  );
};

function getColorGroupArray() {
  return Object.entries(colors).map(([colorName, colorValue]) => {
    if (typeof colorValue === 'string') {
      return {
        colorList: [{ colorName, color: colorValue }],
      };
    }

    const colorList = Object.entries(colorValue as object).map(([colorName, color]) => {
      return {
        colorName,
        color: color as string,
      };
    });
    return {
      colorName,
      colorList,
    };
  });
}

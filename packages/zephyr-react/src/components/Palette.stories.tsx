import { colorPalette } from '@antribute/zephyr-core';
import { capitalCase } from 'change-case';
import { Paper } from 'components/Paper';
import { StatusBadge } from 'components/StatusBadge';

export const Colors = () => {
  const colorList = getColorGroupArray();
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
      <div className="text-md  text-content-weak  pb-8 ">
        <span className="mr-8"> {label}:</span>
        <span className="text-center text-sm">{color}</span>
      </div>
      <div
        className="h-104 w-104  text-content-weak relative flex shrink-0 items-center justify-center rounded-md shadow-sm "
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
        <div className="font-body text-content-intense flex select-none gap-16 pb-16 font-bold">
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
  return Object.entries(colorPalette).map(([colorName, colorValue]) => {
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

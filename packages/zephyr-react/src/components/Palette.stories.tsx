import { colors } from '@antribute/zephyr-core';
import { capitalCase } from 'change-case';

export const Colors = () => {
  const colorList = getColorGroupArray();
  return (
    <div>
      {colorList.map(({ colorName, colorList }) => (
        <ColorGroupContainer title={colorName}>
          {colorList.map(({ color, colorName }) => (
            <ColorBlock key={color} label={colorName} color={color} />
          ))}
        </ColorGroupContainer>
      ))}
    </div>
  );
};

const ColorBlock = ({ label, color }: { label: string; color: string }) => {
  return (
    <div>
      <div className="text-md  text-dark-gray-light  pb-8 ">
        <span className="mr-8"> {label}:</span>
        <span className="text-center text-sm">{color}</span>
      </div>
      <div
        className="h-104 w-104  relative flex jusitfy-center items-center rounded-md shrink-0 text-white shadow-sm "
        style={{ background: color }}
      />
    </div>
  );
};

const ColorGroupContainer = ({
  title,
  children,
  defaultColor,
}: {
  title?: string;
  defaultColor?: string | undefined;
  children: React.ReactNode;
}) => {
  return (
    <div className="pb-24">
      {title && (
        <div className="font-medium pb-16 text-dark-gray select-none underline underline-offset-4 decoration-dark-gray-light">
          {capitalCase(title)}
        </div>
      )}
      <div className="flex flex-wrap gap-24">{children}</div>
    </div>
  );
};

function getColorGroupArray() {
  return Object.entries(colors).map(([colorName, colorMap]) => {
    const colorList = Object.entries(colorMap).map(([colorName, color]) => {
      return {
        colorName,
        color,
      };
    });
    return {
      colorName,
      colorList,
    };
  });
}

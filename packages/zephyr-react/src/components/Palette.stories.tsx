import { colors } from '@antribute/zephyr-core';
import { capitalCase } from 'change-case';

export const Colors = () => {
  const colorList = getColorGroupArray();
  return (
    <div>
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
      <div className="text-content-weak dark:text-content-inverse-weak  pb-8  text-md ">
        <span className="mr-8"> {label}:</span>
        <span className="text-center text-sm">{color}</span>
      </div>
      <div
        className="text-white relative  flex h-104 w-104 shrink-0 items-center justify-center rounded-md shadow-sm "
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
    <div className="pb-24">
      {title && (
        <div className="text-gray decoration-gray select-none pb-16 font-body underline underline-offset-4">
          {capitalCase(title)}
        </div>
      )}
      <div className="flex flex-wrap gap-24">{children}</div>
    </div>
  );
};

function getColorGroupArray() {
  return Object.entries(colors).map(([colorName, colorMap]) => {
    const colorList = Object.entries(colorMap as object).map(([colorName, color]) => {
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

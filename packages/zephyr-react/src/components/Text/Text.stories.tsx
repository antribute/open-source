import { Text } from 'components/Text/Text';

export const Default = () => {
  return (
    <div className="flex flex-col gap-16">
      <Text>Text.Default</Text>
      <Text size="xs">Size: xs</Text>
      <Text size="sm">Size: sm</Text>
      <Text size="md">Size: md</Text>
      <Text size="lg">Size: lg</Text>

      <Text.Paragraph>Text.Paragraph</Text.Paragraph>
      <Text.H6>Text.H6</Text.H6>
      <Text.H5>Text.H5</Text.H5>
      <Text.H4>Text.H4</Text.H4>
      <Text.H3>Text.H3</Text.H3>
      <Text.H2>Text.H2</Text.H2>
      <Text.H1>Text.H1</Text.H1>

      <Text>
        Color: <Text.Italic>default</Text.Italic>{' '}
      </Text>
      <Text color="tint">Color: tint</Text>
      <Text color="ghost">Color: ghost</Text>
      <Text color="subtle">Color: subtle</Text>
      <Text color="weak">Color: weak</Text>
      <Text color="moderate">Color: moderate</Text>
      <Text color="high">Color: high</Text>
      <Text color="strong">Color: strong</Text>
      <Text color="intense">Color: intense</Text>

      <Text.Bold size="lg">Text.Bold</Text.Bold>
      <Text.Italic size="lg">Text.Italics</Text.Italic>
    </div>
  );
};

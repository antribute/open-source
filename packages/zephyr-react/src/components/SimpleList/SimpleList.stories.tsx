import { SimpleList } from 'components/SimpleList';
import { generateMockUserList } from 'mock/mock-data';

const users = generateMockUserList({ size: 15 });

export const Default = () => {
  return (
    <SimpleList.Root>
      {users.map((user) => (
        <SimpleList.Item className="list-disc">{user.name}</SimpleList.Item>
      ))}
    </SimpleList.Root>
  );
};

export const NumberList = () => {
  return (
    <SimpleList.Root variant="numbers">
      {users.map((user) => (
        <SimpleList.Item>{user.name}</SimpleList.Item>
      ))}
    </SimpleList.Root>
  );
};

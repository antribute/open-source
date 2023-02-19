import { generateMockUser, generateMockUserList } from 'mock/mock-data';

import { Avatar } from './Avatar';

const users = generateMockUserList({ size: 300 });

export const Default = () => {
  return (
    <div className="flex items-center gap-16">
      {users.map(({ avatarUrl, name }) => (
        <Avatar src={avatarUrl} label={name} />
      ))}
    </div>
  );
};

export const Initials = () => {
  return (
    <div className="flex flex-wrap items-center gap-16">
      {users.map(({ name }) => (
        <Avatar label={name} />
      ))}
    </div>
  );
};

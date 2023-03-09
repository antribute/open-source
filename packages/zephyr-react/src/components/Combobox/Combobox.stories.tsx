import { UserMockData, generateMockUserList, generateMockUserListHook } from 'mock/mock-data';
import { useState } from 'react';
import { Button } from 'components/Button';
import { Combobox } from '.';

const options = ['One', 'Two', 'Three'];

interface User {
  name: string;
  age: number;
  email: string;
}

const user1: User = { name: 'Jake', age: 22, email: 'jake@gmail.com' };
const user2: User = { name: 'Dan', age: 22, email: 'dan@gmail.com' };
const user3: User = { name: 'Paul', age: 22, email: 'paul@gmail.com' };

const users: User[] = [user1, user2, user3];

const smUserOptions = generateMockUserList({ seed: 1, size: 3 });
const mdUserOptions = generateMockUserList({ seed: 1, size: 8 });
const lgUserOptions = generateMockUserList({ seed: 1, size: 20 });
const xlUserOptions = generateMockUserList({ seed: 1, size: 10000 });
const emptyUserOptions = generateMockUserList({ seed: 1, size: 0 });
const singleUserOptions = generateMockUserList({ seed: 1, size: 1 });

const optionSet = [
  { options: smUserOptions, size: 'SM' },
  { options: mdUserOptions, size: 'MD' },
  { options: lgUserOptions, size: 'LG' },
  { options: xlUserOptions, size: 'XL' },
  { options: singleUserOptions, size: 'Single' },
  { options: emptyUserOptions, size: 'Empty' },
];

export const Default = () => {
  return (
    <div className="flex flex-wrap gap-8">
      {optionSet.map(({ options, size }) => (
        <div>
          <Combobox
            label={`Users - ${size}`}
            options={options}
            getOptionLabel={(e) => `${e.name} ${e.name}`}
            onValueChange={(e) => e.name}
          />
        </div>
      ))}
    </div>
  );
};

const useMockUserList = generateMockUserListHook({ size: 300, delay: 1000 });

export const MultiSelectCombobox = () => {
  const [offset, setOffset] = useState(0);
  const { data, loading } = useMockUserList({ limit: 10, offset });

  console.log('DATA', data);

  return (
    <>
      <Combobox
        value={[]}
        options={data}
        getOptionLabel={(e) => e.name}
        onValueChange={(e) => console.log('VALUES', e)}
        searching={loading}
        isMultiSelect
        onLastOptionItemScrollReached={() => {
          setOffset(offset + 1);
        }}
      />
    </>
  );
};

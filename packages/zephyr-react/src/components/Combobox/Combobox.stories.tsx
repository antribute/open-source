import { UserMockData, generateMockUserList, generateMockUserListHook } from 'mock/mock-data';
import { useState, useEffect } from 'react';
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
            isMultiSelect={false}
            getOptionLabel={(e) => `${e.name} ${e.name}`}
            onValueChange={(e) => {
              console.log('E', e);
            }}
          />
        </div>
      ))}
    </div>
  );
};

const useMockUserList = generateMockUserListHook({ size: 300, delay: 1000 });

const SWAPI_BASE_URL = 'https://swapi.dev/api';

interface Character {
  name: string;
  birth_year: string;
  gender: string;
}

function useCharacters({ search }: { search?: string }) {
  async function searchCharacters(query?: string): Promise<Character[]> {
    const response = await fetch(`${SWAPI_BASE_URL}/people/?search=${query ?? ''}`);
    const data = await response.json();
    return data.results;
  }

  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    searchCharacters(search)
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error searching characters:', error);
        setLoading(false);
      });
  }, [search]);

  return { data, loading };
}

export const MultiSelectCombobox = () => {
  const [search, setSearch] = useState<string | undefined>();
  const [values, setValues] = useState<Character[] | undefined>();
  // const { data, loading } = useMockUserList({ limit: 11, offset: 0 });
  const { data, loading } = useCharacters({ search });

  console.log('DATA', data);

  return (
    <>
      <Combobox
        // value={values}
        options={data}
        getOptionLabel={(e) => e.name}
        onValueChange={(e) => {
          console.log('On value change: ', e);
        }}
        searching={loading}
        isMultiSelect
        onSearch={(v) => {
          console.log('SEAARCH', v);
          setSearch(v);
        }}
      />
    </>
  );
};

import { useEffect, useState } from 'react';

export interface MockCharacter {
  name: string;
  birth_year: string;
  gender: string;
}

export function useMockCharactersQuery({ search }: { search?: string }) {
  const SWAPI_BASE_URL = 'https://swapi.dev/api';

  async function searchCharacters(query?: string): Promise<MockCharacter[]> {
    const response = await fetch(`${SWAPI_BASE_URL}/people/?search=${query ?? ''}`);
    const data = await response.json();
    return data.results;
  }

  const [data, setData] = useState<MockCharacter[]>([]);
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

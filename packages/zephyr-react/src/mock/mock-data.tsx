import { faker } from '@faker-js/faker';
import { chunk, uniqBy } from 'lodash-es';
import { useEffect, useState } from 'react';

const fakerSeed = (seed?: number) => {
  if (seed !== undefined) {
    faker.seed();
  }
};

export interface UserMockData {
  id: number;
  name: string;
  email: string;
  role: string;
  username: string;
  firstName: string;
  lastName: string;
  sexType: 'male' | 'female';
  avatarUrl: string;
}

type MockDataGeneratorFn<T> = (options: { id: number; seed?: number }) => T;

export const generateMockUser: MockDataGeneratorFn<UserMockData> = ({ id, seed }) => {
  fakerSeed(seed);
  const sexType = faker.name.sexType();
  const firstName = faker.name.firstName(sexType);
  const lastName = faker.name.lastName(sexType);
  const name = `${firstName} ${lastName}`;
  const username = faker.internet.userName(faker.internet.userName(firstName, lastName));

  return {
    id,
    name,
    firstName,
    username,
    lastName,
    email: faker.internet.email().toLowerCase(),
    avatarUrl: `https://api.dicebear.com/5.x/identicon/svg?seed=${username}`,
    role: faker.name.jobTitle(),
    sexType,
    vehicle: {
      vehicleType: faker.vehicle.type(),
    },
  };
};

export const generateMockUserList = makeListFactory(generateMockUser);

export const generateMockUserListHook = generateMockDataHook(generateMockUserList);

interface Organization {
  id: number;
  name: string;
  industry: string;
  size: 'small' | 'medium' | 'large';
}

export const generateMockOrganization: MockDataGeneratorFn<Organization> = ({ id, seed }) => {
  fakerSeed(seed);
  return {
    id,
    name: faker.company.companyName(),
    industry: faker.commerce.department(),
    size: faker.helpers.arrayElement(['small', 'medium', 'large']),
  };
};

export const generateMockOrganizationList = makeListFactory(generateMockOrganization);

interface ProjectMockData {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
export const generateMockProject: MockDataGeneratorFn<ProjectMockData> = ({ id, seed }) => {
  fakerSeed(seed);
  return {
    id,
    name: faker.commerce.productName(),
    description: faker.lorem.sentences(),
    startDate: faker.date.past().toString(),
    endDate: faker.date.future().toString(),
  };
};

export const generateMockProjectList = makeListFactory(generateMockProject);

export interface VehicleMockData {
  id: number;
  type: string;
  color: string;
  model: string;
  vin: string;
  manufacturer: string;
}

export const generateMockVehicle: MockDataGeneratorFn<VehicleMockData> = ({ id, seed }) => {
  fakerSeed(seed);

  return {
    id,
    model: faker.vehicle.model(),
    color: faker.vehicle.color(),
    vin: faker.vehicle.vin(),
    type: faker.vehicle.type(),
    manufacturer: faker.vehicle.manufacturer(),
  };
};

export const generateMockVehicleList = makeListFactory(generateMockVehicle);

interface MakeListFnOptions<T> {
  size?: number;
  seed?: number;
  uniqueBy?: keyof T;
}
function makeListFactory<T extends MockDataGeneratorFn<unknown>, TReturnType extends ReturnType<T>>(
  generator: T
) {
  return (options?: MakeListFnOptions<TReturnType>) => {
    const { size = 10, seed: seedProp = 0, uniqueBy } = options ?? {};

    const result = new Array(size).fill(0).map((_e, i) => {
      const seed = 100 + (seedProp + i);
      faker.seed(seed + i);
      return generator({ id: i }) as TReturnType;
    });

    const uniqByResult = uniqueBy ? uniqBy(result, uniqueBy) : result;

    return uniqByResult;
  };
}

// type MakeListFactoryFnReturn = <
//   T extends MockDataGeneratorFn<unknown> = MockDataGeneratorFn<unknown>,
//   TReturnType extends ReturnType<T> = ReturnType<T>
// >(
//   generator: T
// ) => (options?: MakeListFnOptions<TReturnType>) => TReturnType[];

type ListFactoryFn<TReturnType = unknown> = (
  options?: MakeListFnOptions<TReturnType>
) => TReturnType[];

async function fetchServerPage(
  limit: number,
  offset = 0
): Promise<{ rows: string[]; nextOffset: number }> {
  const rows = new Array(limit).fill(0).map((_, i) => `Async loaded row #${i + offset * limit}`);

  // eslint-disable-next-line no-promise-executor-return
  await new Promise((r) => setTimeout(r, 500));

  return { rows, nextOffset: offset + 1 };
}

interface HookProps {
  limit: number;
  offset: number;
}

interface HookReturn<T> {
  data: T[];
  loading: boolean;
}

function generateMockDataHook<
  TGenerator extends ListFactoryFn,
  T extends TGenerator extends ListFactoryFn<infer G> ? G : never
>(generator: TGenerator) {
  return ({ size, delay = 1000 }: { size: number; delay?: number }) => {
    const list = generator({ size });

    const useHook = ({ limit = 10, offset = 0 }: HookProps): HookReturn<T> => {
      const listChunks = chunk(list, limit);

      const [data, setData] = useState<T[]>([]);
      const [loading, setLoading] = useState<boolean>(false);

      useEffect(() => {
        if (offset <= listChunks.length - 1) {
          setLoading(true);

          const fetchData = async () => {
            try {
              const newList = await new Promise((resolve) => {
                setTimeout(() => {
                  resolve(listChunks[Math.min(offset, listChunks.length - 1)]);
                }, delay);
              });

              setData(newList as T[]);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.error('ERRORRR', error);
            }
            setLoading(false);
          };
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [offset]);

      return { data, loading };
    };

    return useHook;
  };
}
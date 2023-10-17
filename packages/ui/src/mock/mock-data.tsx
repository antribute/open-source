import { faker } from '@faker-js/faker';
import { chunk, uniqBy } from 'lodash-es';
import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';

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
  aboutMe: string;
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
    aboutMe: faker.lorem.lines(2),
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

export type MockDataEnvironemnt = (typeof mockDataEnvironments)[number];

export const mockDataEnvironments = ['staging', 'preview', 'production', 'sandbox'] as const;

export type MockDataDeploymentStatus = (typeof mockDataDeploymentStatuses)[number];

export const mockDataDeploymentStatuses = ['offline', 'online', 'error'] as const;

export interface DeploymentMockData {
  id: number;
  href: string;
  projectName: string;
  teamName: string;
  status: MockDataDeploymentStatus;
  statusText: string;
  description: string;
  environment: MockDataEnvironemnt;
  deploymentTime: string;
}

export const generateMockDeployment: MockDataGeneratorFn<DeploymentMockData> = ({ id, seed }) => {
  fakerSeed(seed);

  const href = '#';
  const teamName = faker.company.name();
  const projectName = faker.helpers.arrayElement([
    `${paramCase(teamName)}.com`,
    paramCase(teamName),
  ]);
  const statusText = faker.lorem.sentence();
  const description = 'Deploys from Github';
  const status = faker.helpers.arrayElement([...mockDataDeploymentStatuses, 'online'] as const);
  const environment = faker.helpers.arrayElement(mockDataEnvironments);

  const deploymentTime = faker.helpers.arrayElement(['1d ago', '3m ago', '1m 32s ago', '6d ago']);

  return {
    id,
    href,
    projectName,
    teamName,
    status,
    statusText,
    description,
    environment,
    deploymentTime,
  };
};

export const generateMockDeploymentList = makeListFactory(generateMockDeployment);

export const generateMockDeploymentListHook = generateMockDataHook(generateMockDeploymentList);

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
  fuel: string;
  purchaseDate: Date;
  price: string;
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
    fuel: faker.vehicle.fuel(),
    purchaseDate: faker.date.recent(),
    price: faker.commerce.price(5000, 100000),
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

    // New Array() is an amazing util for mock data, disabling the rule for this case
    // eslint-disable-next-line unicorn/no-new-array
    const result = new Array(size).fill(0).map((_e, i) => {
      const seed = 100 + (seedProp + i);
      faker.seed(seed + i);
      return generator({ id: i }) as TReturnType;
    });

    const uniqByResult = uniqueBy ? uniqBy(result, uniqueBy) : result;

    return uniqByResult;
  };
}

type ListFactoryFn<TReturnType = unknown> = (
  options?: MakeListFnOptions<TReturnType>
) => TReturnType[];

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
              console.error('ERRORRR', error);
            }
            setLoading(false);
          };
          fetchData();
        }
      }, [offset]);

      return { data, loading };
    };

    return useHook;
  };
}

import { faker } from '@faker-js/faker';
import { uniqBy } from 'lodash-es';

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

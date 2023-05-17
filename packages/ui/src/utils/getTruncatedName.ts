import { exhaustive } from 'exhaustive';
import { truncate } from 'lodash-es';

export type TruncatedNameStyle =
  | 'F'
  | 'M'
  | 'L'
  | 'FL'
  | 'FML'
  | 'Firstname L.'
  | 'Firstname Lastname'
  | 'Firstname M. Lastname'
  | 'Firstname Middlename Lastname'
  | 'F. Lastname'
  | 'Firstname'
  | 'Middlename'
  | 'Lastname'
  | 'none';

interface GetTruncatedNameOptions {
  truncatedStyle: TruncatedNameStyle;
  maxLength?: number;
}

export function getTruncatedName(
  name: string | NameParts,
  { maxLength = 20, truncatedStyle = 'FL' }: GetTruncatedNameOptions
) {
  const { firstName = '', middleName = '', lastName = '', fullName = '' } = getNameParts(name);

  const [F = '', M = '', L = ''] = [firstName, middleName, lastName].map((name) => {
    if (!name) return '';

    return name[0]?.toUpperCase();
  });

  function withPeriod(input?: string) {
    return input ? `${input}.` : '';
  }

  const truncatedName = exhaustive(truncatedStyle, {
    F: () => F,
    M: () => M,
    L: () => `${L}`,
    FL: () => `${F}${L}`,
    FML: () => `${F}${M}${L}`,
    'Firstname L.': () => `${firstName} ${withPeriod(L)}`,
    'F. Lastname': () => `${withPeriod(firstName)} ${middleName} ${lastName}`,
    'Firstname Lastname': () => `${firstName} ${lastName}`,
    'Firstname M. Lastname': () => `${firstName} ${withPeriod(M)} ${lastName}`,
    'Firstname Middlename Lastname': () => `${firstName} ${middleName} ${lastName}`,
    Firstname: () => F,
    Lastname: () => `${firstName} ${middleName} ${lastName}`,
    Middlename: () => middleName,
    none: () => fullName,
    _: () => fullName,
  }).trim();

  return truncate(truncatedName, { length: maxLength, omission: '...' });
}

interface NameParts {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  fullName?: string;
}

function getNameParts(name: string | NameParts) {
  if (typeof name === 'string') {
    const nameParts = name.trim().split(' ');

    const [firstName, ...rest] = nameParts;

    const middleName = rest.length > 1 ? rest[0] : undefined;

    const lastName = rest[rest.length - 1];

    const fullName = nameParts.join(' ');

    return {
      firstName,
      lastName,
      middleName,
      fullName,
    };
  }

  const { firstName, middleName, lastName, fullName } = name;

  return {
    firstName,
    middleName,
    lastName,
    fullName: fullName ?? [firstName, middleName, lastName].filter(Boolean).join(' '),
  };
}

import { notEmpty } from '../../colors/helpers/generateHexAlphaColorGroup';

type SingleKeyObject<K extends string, T> = { [P in K]: T } & Readonly<Record<string, never>>;

export function classComponentPreset<
  TPrefix extends `${string}-` = `${string}-`,
  TComponentMap extends Record<string, string> = Record<string, string>
>(prefix: TPrefix, componentMap: TComponentMap) {
  return classComponents(componentMap, prefix) as ClassComponentMap<
    Record<`${TPrefix}${Extract<keyof TComponentMap, string>}`, string>
  >;
}

export function classComponentMap<K extends string, V, NK extends string, NV extends string>(
  data: Record<K, V> | K[] | readonly K[] | NK,
  fn: (key: K, value: V) => { name: NK; className: NV }
): Record<ClassNameString<NK>, ClassComponentValue<NK>> {
  const collection = typeof data === 'string' ? [data] : data;

  const obj = Array.isArray(collection)
    ? (Object.fromEntries(collection.map((key) => [key, undefined])) as Record<K, undefined>)
    : collection;

  const result = Object.fromEntries(
    Object.entries(obj)
      .map(([k, v]) => {
        const { name, className } = fn(k as K, v as V);

        const entry = classComponentEntry(name, className);

        return entry;
      })
      .filter(notEmpty)
  );

  return result as Record<ClassNameString<NK>, ClassComponentValue<NK>>;
}

type ClassNameString<T extends string> = T extends `.${T}` ? T : `.${T}`;

export type ClassComponentMap<T extends Record<string, string> = Record<string, string>> = {
  [K in keyof T as ClassNameString<Extract<K, string>>]: ClassComponentValue<T[K]>;
};

export function classComponents<T extends Record<string, string>>(
  componentMap: T,
  prefix: `${string}-` | '' = ''
) {
  return classComponentMap(componentMap, (name, className) => ({
    name: `${prefix}${name}`,
    className,
  })) as ClassComponentMap<T>;
}

export function classComponent<TName extends string>(name: TName, twClass: string) {
  const entry = classComponentEntry(name, twClass);

  return Object.fromEntries([entry]) as SingleKeyObject<
    ClassNameString<TName>,
    ClassComponentValue
  >;
}

function classComponentEntry<TClassName extends string, TTWClass extends string>(
  name: TClassName,
  twClass: TTWClass
) {
  const clssName = name.startsWith('.') ? name : `.${name}`;

  const component = [
    clssName,
    {
      [getTwClassString(twClass)]: {},
    },
  ];

  return component as [ClassNameString<TClassName>, ClassComponentValue<TTWClass>];
}

type ClassComponentValue<T extends string = string> = SingleKeyObject<
  `@apply ${T}`,
  Record<string, never>
>;

function getTwClassString(classString = '') {
  const cleaned = classString
    .trim()
    .split(' ')
    .filter((token) => token.length > 0)
    .join(' ');
  return `@apply ${cleaned}`;
}

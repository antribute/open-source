import type { Split, Writable } from 'type-fest';

/**
 * Type representing the `dataAttributes` object.
 */
export type DataAttributes = Writable<typeof dataAttributes>;

/**
 * An object containing predefined data attributes and their default values.
 */
export const dataAttributes = {
  'data-antribute-list': 'divide no-item-gutters no-gap zebra-items rounded-items',
  'data-antribute-card': 'padding padding-none',
} as const satisfies Record<`data-antribute-${string}`, string | boolean>;

/**
 * Type representing Tailwind CSS data attribute shortcut keys and their values.
 */
type TailwindDataAttributeShortcuts = {
  [K in keyof DataAttributes as K extends `data-${infer P}`
    ? `${P}${DataAttributes[K] extends string ? `-${DataAttributeStringValue<K>}` : `-${K}`}`
    : never]: string;
};

/**
 * Type representing the value of a single data attribute as a string.
 *
 * @typeparam TKey The key of the data attribute.
 */
type DataAttributeStringValue<
  TKey extends keyof DataAttributes,
  TAttributeValue extends DataAttributes[TKey] = DataAttributes[TKey]
> = TAttributeValue extends string ? Split<TAttributeValue, ' '>[number] : never;

type DataAttributeOptions = {
  [K in keyof DataAttributes]?: DataAttributes[K] extends string
    ? Partial<Record<DataAttributeStringValue<K>, boolean | undefined>>
    : boolean | undefined;
};

/**
 * Retrieves the value of a data attribute for the specified key and values.
 *
 * @param dataAttributeOptions The key of the data attribute to retrieve.
 * @returns An object containing the requested data attribute and its value.
 */
export function getDataAttributes<TDataAtributeOptions extends DataAttributeOptions>(
  dataAttributeOptions: TDataAtributeOptions
) {
  const entries = Object.entries(dataAttributeOptions).map(([attributeKey, filterValue]) => {
    const dataAttributeValue = dataAttributes[attributeKey as keyof DataAttributes];

    if (typeof dataAttributeValue === 'string') {
      // const filtered = value ? filterStringAttributes(dataAttribute, value) : dataAttribute;
      const filtered = filterStringAttributes(dataAttributeValue, filterValue);

      return [attributeKey, filtered];
    }

    if (typeof dataAttributeValue === 'boolean') {
      return [attributeKey, String(filterValue)];
    }

    return [attributeKey, undefined];
  });

  function filterStringAttributes(str: string, values: unknown) {
    return str
      .split(' ')
      .filter((attribute) => {
        return Boolean(
          values &&
            typeof values === 'object' &&
            attribute in values &&
            (values as Record<string, unknown>)[attribute]
        );
      })
      .join(' ');
  }

  return Object.fromEntries(entries) as Record<keyof TDataAtributeOptions, string>;
}

getDataAttributes({ 'data-antribute-card': { 'padding-none': true } });
// /**
//  * Retrieves the value of a data attribute for the specified key and values.
//  *
//  * @param dataAttribute The key of the data attribute to retrieve.
//  * @param values Optional values to filter the attribute value.
//  * @returns An object containing the requested data attribute and its value.
//  */
// export function getDataAttribute<
//   TAttributeKey extends keyof DataAttributes,
//   TAttributeValue extends DataAttributes[TAttributeKey],
//   TValues extends TAttributeValue extends string
//     ? Partial<Record<DataAttributeStringValue<TAttributeKey>, boolean | undefined>>
//     : TAttributeValue extends boolean
//     ? boolean | undefined
//     : never
// >(dataAttribute: TAttributeKey, values?: TValues) {
//   const entries = Object.entries(dataAttributes)
//     .filter(([key]) => {
//       return key === dataAttribute;
//     })
//     .map(([dataAttributeKey, dataAttribute]) => {
//       if (typeof dataAttribute === 'string') {
//         const filtered = values ? filterStringAttributes(dataAttribute) : dataAttribute;

//         return [dataAttributeKey, filtered];
//       }

//       if (typeof dataAttribute === 'boolean') {
//         return [dataAttributeKey, String(dataAttribute)];
//       }

//       return [dataAttributeKey, undefined];
//     });

//   function filterStringAttributes(str: string) {
//     return str
//       .split(' ')
//       .filter((a) => {
//         return typeof values === 'object' && a in values && Boolean(values![a as keyof TValues]);
//       })
//       .join(' ');
//   }

//   return Object.fromEntries(entries) as { [K in TAttributeKey]: string };
// }

/**
 * Generates an object containing shortcuts for commonly used tailwind CSS data attributes.
 *
 * @returns An object containing tailwind CSS data attribute shortcuts.
 */

export function getTailwindDataAttributeShortcuts() {
  const entries = Object.entries(dataAttributes).flatMap(([key, value]) => {
    const attributeName = key.trim().replace('data-', '');

    function parseStringAttributes(str: string) {
      return str
        .split(' ')
        .map((e) => e.trim())
        .filter(Boolean);
    }

    const attributes = typeof value === 'string' ? parseStringAttributes(value) : [value];

    return attributes.map((attribute) => {
      if (typeof attribute === 'string') {
        return [`${attributeName}-${attribute}`, `${attributeName}~="${attribute}"`];
      }

      if (typeof attribute === 'boolean') {
        return [attribute, `${attributeName}="${String(attribute)}"`];
      }

      return [attribute, `${attributeName}=true`];
    });
  });

  return Object.fromEntries(entries) as TailwindDataAttributeShortcuts;
}

/* eslint-disable @typescript-eslint/restrict-template-expressions */
// @ts-expect-error This path exists but no types
import { stringify } from 'arktype/internal/utils/serialize';
import { pascalCase } from 'change-case';

export interface GenerateArktypeDtsCodeOptions {
  arktypeDefinitions: GenerateArktypeTypeDefOptions[];
}

export function generateArktypeDtsCode({ arktypeDefinitions }: GenerateArktypeDtsCodeOptions) {
  const generatedArktypeTypeDefs = arktypeDefinitions
    .map((def) => {
      const { schemaVariable, typeDefinition } = generateArktypeTypeDef(def);
      return `${typeDefinition}\n\n${schemaVariable}\n`;
    })
    .join('\n');

  return `
  import { type, Type } from 'arktype'

  ${generatedArktypeTypeDefs.trim()}
  `;
}

export interface GenerateArktypeTypeDefOptions {
  name: string;
  schemaDefinition: object;
}

export function generateArktypeTypeDef({ name, schemaDefinition }: GenerateArktypeTypeDefOptions) {
  const pascalName = pascalCase(name);

  const schemaVariableName = `FeatureType${pascalName}Schema`;

  const typeDefinitionName = `FeatureType${pascalName}Type`;

  const schemaVariable = `export const ${schemaVariableName} = type(${stringify(
    schemaDefinition,
    2
  )})`;

  const typeDefinition = `export type ${typeDefinitionName} = typeof ${schemaVariableName}.infer`;

  return { schemaVariable, typeDefinition };
}

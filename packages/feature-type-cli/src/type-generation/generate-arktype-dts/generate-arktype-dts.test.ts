import { describe, it } from 'vitest';
import path from 'path';
import {
  generateArktypeTypeDef,
  generateArktypeDtsCode,
  GenerateArktypeTypeDefOptions,
} from './generateArktypeTypeDef';
import { generateArktypeDtsFile } from './generateArktypeDtsFile';

const userDefinition: GenerateArktypeTypeDefOptions = {
  name: 'User',
  schemaDefinition: {
    id: 'number',
    name: 'string | number',
    email: 'email',
    age: 'number > 30',
  },
};

describe('generate-arktype-dts', () => {
  it('generate d.ts file', () => {
    generateArktypeDtsFile({
      output: path.join(__dirname, './generated/arktype-types.d.ts'),
      arktypeDefinitions: [userDefinition],
    });
  });

  it('generate arktype type definition code string', () => {
    generateArktypeTypeDef(userDefinition);
  });

  it('generate arktype d.ts code string', () => {
    generateArktypeDtsCode({
      arktypeDefinitions: [userDefinition],
    });
  });
});

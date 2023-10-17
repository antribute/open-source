// Bun lacks support for wildcard package.json exports. Until this is added or ArkType changes
// their export methodology, this test file is disabled

import path from 'path';
import { describe, it } from 'bun:test';
import type { GenerateArktypeTypeDefOptions } from './generateArktypeTypeDef';
import { generateArktypeDtsCode, generateArktypeTypeDef } from './generateArktypeTypeDef';
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

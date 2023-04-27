export interface AdditionalSchemaContentTemplate {
  dbType: string;
  dbUrl: string;
  pothosGenerator: string;
  prismaOutputDir: string;
}
export const additionalSchemaContentTemplate = `//
// Autogenerated by \`@antribute/backend-cli\`
// Any modifications will be overwritten on subsequent runs.
//

generator client {
  output   = "{{prismaOutputDir}}"
  provider = "prisma-client-js"
}

{{pothosGenerator}}

datasource db {
  provider = "{{dbType}}"
  url      = {{dbUrl}}
}
`;

export interface PothosGeneratorTemplate {
  prismaOutputDir: string;
  pothosOutputFile: string;
}
export const pothosGeneratorTemplate = `generator pothos {
  provider = "prisma-pothos-types"
  clientOutput = "{{prismaOutputDir}}"
  output = "{{pothosOutputFile}}"
}`;

export interface PrismaAccessorTemplate {
  logLevel: 'query' | 'info' | 'warn' | 'error';
}
export const prismaAccessorTemplate = `//
// Autogenerated by \`@antribute/backend-cli\`
// Any modifications will be overwritten on subsequent runs.
//

import { PrismaClient } from '../prisma';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['{{logLevel}}'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
`;

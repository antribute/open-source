import { access, mkdir, writeFile } from 'fs/promises';
import { resolve } from 'path';

import type { Config } from 'utils/config';
import logger from 'utils/logger';

export const generateNextAuthPlatform = async (config: Config) => {
  logger.debug('Computing directories for Auth config generating', config);
  const { orm, server } = config;
  const authModuleDir = resolve(process.cwd(), server.dir, 'auth');
  logger.debug(`Auth Module directory set to ${authModuleDir}`, config);
  const authUtilsFile = resolve(authModuleDir, 'auth.utils.ts');
  logger.debug(`Auth utils output file set to ${authUtilsFile}`, config);

  try {
    await access(authModuleDir);
    logger.debug('NextAuth.js helpers have already been generated, skipping generation', config);
    return;
  } catch (err) {
    // Do nothing, if the auth dir doesn't exist we can continue generation
  }

  logger.debug(
    `Creating auth module directory (if it doesn't already exist) at ${authModuleDir}`,
    config
  );
  await mkdir(authModuleDir, { recursive: true });

  if (orm.enabled && orm.platform === 'prisma') {
    const authSchemaFile = resolve(authModuleDir, 'auth.prisma');
    logger.debug(`Generating Prisma Schema for NextAuth.js at ${authSchemaFile}`, config);
    const authSchemaContent = `//
// Autogenerated by \`@antribute/backend-cli\`
// This is only generated on first run, so be careful while
// modifying as Antribute Backend requires this schema
//

model Account {
  id                String   @id @default(uuid())
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  access_token      String?  @map("accessToken")
  expires_at        Int?     @map("expiresAt")
  id_token          String?  @map("idToken")
  provider          String
  providerAccountId String
  refresh_token     String?  @map("refreshToken")
  scope             String?
  session_state     String?  @map("sessionState")
  token_type        String?  @map("tokenType")
  type              String
  userId            String

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// We recommend only ever modifying the user model as the rest of these models contain required
// functionality for NextAuth.js
model User {
  id            String       @id @default(uuid())
  accounts      Account[]
  email         String?      @unique
  emailVerified DateTime?
  name          String?
  image         String?      @map("pic")
  sessions      Session[]
}

`;
    await writeFile(authSchemaFile, authSchemaContent);
  }

  const authUtilContent = `//
// Autogenerated by \`@antribute/backend-cli\`
// This is only generated on first run, so be careful while
// modifying as Antribute Backend requires these exports
//

import type { AuthOptions } from 'next-auth';
${
  orm.enabled && orm.platform === 'prisma'
    ? `import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { prisma } from '../generated/db';

export const adapter = PrismaAdapter(prisma);`
    : ''
}
export const providers: AuthOptions['providers'] = [];
`;

  logger.debug(`Writing NextAuth utils at ${authUtilsFile}`, config);
  await writeFile(authUtilsFile, authUtilContent);
  logger.info('NextAuth.js Configuration Successfully Generated', config);
};

export const generateAuth = async (config: Config) => {
  switch (config.auth.platform) {
    case 'nextauth':
      logger.debug('Selected Platform: NextAuth.js', config);
      await generateNextAuthPlatform(config);
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Invalid Platform ${config.auth.platform}`);
  }
};

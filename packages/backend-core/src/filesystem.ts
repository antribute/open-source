import { mkdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

import type { Config } from './config';
import logger from './logger';

interface GenerateFileParams {
  fileContent: string;
  fileName: string;
  filePath: string;
}

export const getServerDir = (config: Config) => resolve(process.cwd(), config.dir);

export const getGeneratedDir = (config: Config) => join(getServerDir(config), 'generated');

export const generateFile = async (params: GenerateFileParams, config: Config) => {
  const filePath = join(params.filePath, params.fileName);
  logger.debug(`Creating directory if not exists: ${params.filePath}`, config);
  await mkdir(params.filePath, { recursive: true });
  logger.debug('Directory created successfully', config);

  logger.debug(`Writing file to: ${filePath}`, config);
  await writeFile(filePath, params.fileContent);
  logger.debug('File written successfully', config);
};

import { mkdir, writeFile } from 'fs/promises';
import { resolve, join } from 'path';

import type { Config } from './config';
import logger from './logger';

interface GenerateFileParams {
  fileContent: string;
  fileName: string;
  filePath?: string;
  parentPath?: string;
}

export const getServerDir = (config: Config) => resolve(process.cwd(), config.server.dir);

export const getGeneratedDir = (config: Config) => join(getServerDir(config), 'generated');

export const generateFile = async (params: GenerateFileParams, config: Config) => {
  const directoryPath = join(params.parentPath ?? getGeneratedDir(config), params.filePath ?? '');
  const filePath = join(directoryPath, params.fileName);
  logger.debug(`Creating directory if not exists: ${directoryPath}`, config);
  await mkdir(directoryPath, { recursive: true });
  logger.debug('Directory created successfully', config);

  logger.debug(`Writing file to: ${filePath}`, config);
  await writeFile(filePath, params.fileContent);
  logger.debug('File written successfully', config);
};

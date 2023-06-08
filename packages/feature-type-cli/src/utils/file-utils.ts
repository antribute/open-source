import { WriteFileOptions, outputFileSync } from 'fs-extra';

export function createNewFile({
  filePath,
  fileData,
  writeFileOptions,
}: {
  filePath: string;
  fileData: string | NodeJS.ArrayBufferView;
  format?: boolean;
  writeFileOptions?: WriteFileOptions;
}) {
  outputFileSync(filePath, fileData, writeFileOptions);
}

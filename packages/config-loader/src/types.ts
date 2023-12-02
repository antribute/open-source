import type { PartialDeep } from 'type-fest';

export type DefineConfigFn<ConfigShape = unknown> = (
  partialConfig: PartialDeep<ConfigShape>
) => ConfigShape;

export interface LoadConfigParams {
  cwd?: string;
  fileNames: string[];
  overrideConfigPath?: string;
}

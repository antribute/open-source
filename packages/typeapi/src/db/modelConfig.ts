export interface RestOverride {
  endpointUrl: string;
}

export interface RestConfig {
  baseUrl: string;
  readOne: boolean | RestOverride;
}

export interface ModelConfig {
  rest: boolean | RestConfig;
}

export const defineModelConfig = <ModelName extends keyof TypeAPI.Schema>(
  name: ModelName,
  config: Partial<ModelConfig>
) => ({
  name,
  config,
});

export type PluginFactory<C extends object | never> = (conf: C) => TypeApi.Plugin;

export const createPlugin = <C extends object | never>(
  factory: PluginFactory<C>
): PluginFactory<C> => factory;

import type { SdkFuncs, SdkShape } from './types';

/**
 * TODO: Write a short blurb on what the sdk does
 */
export class Sdk<S extends SdkShape> {
  public config: TypeApi.SdkConfig;
  // TODO: I kinda hate these variable names but idk what to call them
  public funcs: SdkFuncs<S>;
  public shape: S;

  constructor(shape: S, config: TypeApi.SdkConfig = {}) {
    this.config = config;
    this.funcs = Object.entries(shape).reduce(
      (acc, [name, { resolver }]) => ({ ...acc, [name]: resolver }),
      {} as SdkFuncs<S>
    );
    this.shape = shape;
  }
}

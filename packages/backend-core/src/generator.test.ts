import { describe, expect, it } from 'bun:test';

import { defaultConfig } from 'config';
import { importAndRunGenerator } from './generation';

describe.skip('generation', () => {
  it('should run a given generator', async () => {
    const res = await importAndRunGenerator(
      'testStep',
      './test-config-files/testGenerator.ts',
      defaultConfig
    );
    expect(res).toBeUndefined();
  });

  it('should throw if a generator does not have a default export', () => {
    // Vitest handles rejections safely here
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(() =>
      importAndRunGenerator(
        'testStep',
        './test-config-files/badExportTestGenerator.ts',
        defaultConfig
      )
    ).rejects.toThrowError('BAD_GENERATOR_EXPORT_NAME');
  });

  it('should throw if a generator does not export a function by default', () => {
    // Vitest handles rejections safely here
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(() =>
      importAndRunGenerator(
        'testStep',
        './test-config-files/badTypeTestGenerator.ts',
        defaultConfig
      )
    ).rejects.toThrowError('BAD_GENERATOR_EXPORT_TYPE');
  });
});

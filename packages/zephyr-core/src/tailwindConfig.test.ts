import { describe, expect, it } from 'vitest';
import tailwindConfig from './tailwindConfig';

// TODO: These should probably eventually be integration tests to make sure the compiler is doing
// what we expect it to, but this is a good enough start
describe('tailwindConfig', () => {
  it('should allow all classNames from zephyr-core to be used', () => {
    const { content } = tailwindConfig;
    expect((content as string[]).includes('./node_modules/@antribute/zephyr-core/dist/index.js'));
  });

  it('should allow all classNames from local ts and tsx files to be used', () => {
    const { content } = tailwindConfig;
    expect((content as string[]).includes('./src/**/*.{ts,tsx}'));
  });

  it('should allow all classNames from local htm and html files to be used', () => {
    const { content } = tailwindConfig;
    expect((content as string[]).includes('./*.{htm,html}'));
    expect((content as string[]).includes('./public/*.{htm,html}'));
  });
});

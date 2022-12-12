import Mixpanel from 'mixpanel';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { track, updateUser } from './server';

const consoleInfoSpy = vi.spyOn(console, 'info');
const mixpanelPeopleSetMock = vi.fn();
const mixpanelTrackMock = vi.fn();

const mixpanelInitSpy = vi.spyOn(Mixpanel, 'init').mockImplementation(() => ({
  // @ts-expect-error: We're only mocking the parts of mixpanel we actually use
  people: { set: mixpanelPeopleSetMock },
  track: mixpanelTrackMock,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('track', () => {
  it('should only log when a token is not provided', () => {
    track({ event: 'foo' });
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(0);
    expect(mixpanelTrackMock).toHaveBeenCalledTimes(0);
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
  });

  it('should call mixpanel init and track when a token is provided', () => {
    track({ event: 'foo', token: 'bar' });
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelTrackMock).toHaveBeenCalledTimes(1);
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
  });
});

describe('updateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should only log when a token is not provided', () => {
    updateUser({ userId: 'foo' }, {});
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(0);
    expect(mixpanelPeopleSetMock).toHaveBeenCalledTimes(0);
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
  });

  it('shouldcall mixpanel init and people.set when a token is provided', () => {
    updateUser({ token: 'foo', userId: 'bar' }, {});
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelPeopleSetMock).toHaveBeenCalledTimes(1);
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
  });
});

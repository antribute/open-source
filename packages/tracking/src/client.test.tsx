import mixpanel from 'mixpanel-browser';
import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, beforeEach, describe, expect, it, spyOn } from 'bun:test';

import { TrackingProvider, useTracking } from './client';

describe('useTracking', () => {
  const mixpanelInitSpy = spyOn(mixpanel, 'init').mockImplementation(() => ({} as any));
  const mixpanelTrackSpy = spyOn(mixpanel, 'track').mockImplementation(() => undefined);
  const consoleInfoSpy = spyOn(console, 'info');

  beforeEach(() => {
    mixpanelInitSpy.mockClear();
    mixpanelTrackSpy.mockClear();
    consoleInfoSpy.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    mixpanelInitSpy.mockRestore();
    mixpanelTrackSpy.mockRestore();
    consoleInfoSpy.mockRestore();
  });

  it('should only log when a token is not provided', async () => {
    function TestComponent() {
      const track = useTracking();
      return (
        <button onClick={() => track('test-event')} type="button">
          Track Me
        </button>
      );
    }
    const screen = render(
      <TrackingProvider value={{}}>
        <TestComponent />
      </TrackingProvider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Track Me'));
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(0);
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(0);
  });

  it('should call mixpanel init and track when a token is provided', async () => {
    function TestComponent() {
      const track = useTracking();
      return (
        <button onClick={() => track('test-event')} type="button">
          Track Me
        </button>
      );
    }
    const screen = render(
      <TrackingProvider value={{ token: 'foo', globalParams: {} }}>
        <TestComponent />
      </TrackingProvider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Track Me', {}));
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(1);
  });

  // it('should add a [Tracking (Log Only)] prefix to logs if a mixpanel token is not provided', () => {
  //   expect(buildLoggingPrefix().includes('[Tracking (Log Only)]:')).toEqual(true);
  // });
});

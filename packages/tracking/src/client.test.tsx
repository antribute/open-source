import mixpanel from 'mixpanel-browser';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { TrackingProvider, useTracking } from './client';

describe('useTracking', () => {
  const mixpanelInitSpy = vi.spyOn(mixpanel, 'init').mockImplementation(() => undefined);
  const mixpanelTrackSpy = vi.spyOn(mixpanel, 'track').mockImplementation(() => undefined);
  const user = userEvent.setup();
  const consoleInfoSpy = vi.spyOn(console, 'info');

  beforeEach(() => {
    vi.clearAllMocks();
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
    render(
      <TrackingProvider value={{}}>
        <TestComponent />
      </TrackingProvider>
    );
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
    render(
      <TrackingProvider value={{ token: 'foo', globalParams: {} }}>
        <TestComponent />
      </TrackingProvider>
    );
    await user.click(screen.getByText('Track Me', {}));
    expect(consoleInfoSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelInitSpy).toHaveBeenCalledTimes(1);
    expect(mixpanelTrackSpy).toHaveBeenCalledTimes(1);
  });

  // it('should add a [Tracking (Log Only)] prefix to logs if a mixpanel token is not provided', () => {
  //   expect(buildLoggingPrefix().includes('[Tracking (Log Only)]:')).toEqual(true);
  // });
});

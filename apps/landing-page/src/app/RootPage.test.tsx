import { TrackingProvider } from '@antribute/tracking';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import RootPage from './RootPage';

describe.skip('RootPage', () => {
  it('should include links to our LinkedIn and Twitter', () => {
    render(
      <TrackingProvider value={{}}>
        <RootPage />
      </TrackingProvider>
    );
    screen.getByText('LinkedIn');
    screen.getByText('Twitter');
  });
});
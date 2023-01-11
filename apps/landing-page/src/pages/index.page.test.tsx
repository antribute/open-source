import { TrackingProvider } from '@antribute/tracking';
import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Home from './index.page';

describe.skip('Home', () => {
  it('should include links to our LinkedIn and Twitter', () => {
    render(
      <TrackingProvider value={{}}>
        <Home />
      </TrackingProvider>
    );
    screen.getByText('LinkedIn');
    screen.getByText('Twitter');
  });
});

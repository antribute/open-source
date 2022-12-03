import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Home from './index.page';

describe('Home', () => {
  it('should include links to our LinkedIn and Twitter', () => {
    render(<Home />);
    screen.getByText('LinkedIn');
    screen.getByText('Twitter');
  });
});

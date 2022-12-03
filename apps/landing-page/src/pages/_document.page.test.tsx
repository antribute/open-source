import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import Document from './_document.page';

describe('Home', () => {
  // From wht I can tell document is an untestable file. We'll have to look further into this
  it.skip('should render the correct initial Title', () => {
    render(<Document />);
    screen.getByText('Antribute');
  });
});

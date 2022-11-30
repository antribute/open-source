import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import TestComponent from '.';

describe('TestComponent', () => {
  it('should render a simple hello world', () => {
    render(<TestComponent />);
    screen.getByText('Hello, World!');
  });
});

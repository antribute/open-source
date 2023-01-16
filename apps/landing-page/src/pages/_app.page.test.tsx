import { render, screen } from '@testing-library/react';
import type { Router } from 'next/router';
import { describe, it } from 'vitest';

import App from './_app.page';

describe('Home', () => {
  // Temporarily disabling this test until I figure out the best way to mock NextAuth
  it.skip('should render body components appropriately', () => {
    function TestComponent({ text }: { text: string }) {
      return <h1>{text}</h1>;
    }
    // eslint-disable-next-line react/jsx-no-bind
    render(<App Component={TestComponent} pageProps={{ text: 'Foo' }} router={{} as Router} />);
    screen.getByText('Foo');
  });
});

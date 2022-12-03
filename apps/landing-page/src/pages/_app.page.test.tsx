import { render, screen } from '@testing-library/react';
import type { Router } from 'next/router';
import { describe, it } from 'vitest';

import App from './_app.page';

describe('Home', () => {
  it('should render body components appropriately', () => {
    // eslint-disable-next-line react/function-component-definition
    const TestComponent = ({ text }: { text: string }) => <h1>{text}</h1>;
    render(<App Component={TestComponent} pageProps={{ text: 'Foo' }} router={{} as Router} />);
    screen.getByText('Foo');
  });
});

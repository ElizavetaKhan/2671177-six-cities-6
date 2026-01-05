import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Spinner component', () => {
  it('should render component', () => {
    const { container } = render(<Spinner />);

    const spinnerElement = container.querySelector('div[style*="border"]');
    expect(spinnerElement).toBeInTheDocument();
  });
});


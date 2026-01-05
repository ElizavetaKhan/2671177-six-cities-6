import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyMainContent from './empty-main-content';

describe('EmptyMainContent component', () => {
  it('should render component with city prop', () => {
    const city = 'Paris';
    render(<EmptyMainContent city={city} />);

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });

  it('should display different city names', () => {
    const city1 = 'Amsterdam';
    const { rerender } = render(<EmptyMainContent city={city1} />);

    expect(screen.getByText(`We could not find any property available at the moment in ${city1}`)).toBeInTheDocument();

    const city2 = 'Cologne';
    rerender(<EmptyMainContent city={city2} />);

    expect(screen.getByText(`We could not find any property available at the moment in ${city2}`)).toBeInTheDocument();
  });
});


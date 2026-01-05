import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritesEmptyPage from './favorites-empty-page';

describe('FavoritesEmptyPage component', () => {
  it('should render empty favorites message', () => {
    render(
      <MemoryRouter>
        <FavoritesEmptyPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });

  it('should render header with logo', () => {
    render(
      <MemoryRouter>
        <FavoritesEmptyPage />
      </MemoryRouter>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });
});


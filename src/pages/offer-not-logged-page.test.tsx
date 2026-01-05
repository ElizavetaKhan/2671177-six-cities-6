import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OfferNotLoggedPage from './offer-not-logged-page';

describe('OfferNotLoggedPage component', () => {
  it('should render offer page for not logged users', () => {
    render(
      <MemoryRouter>
        <OfferNotLoggedPage />
      </MemoryRouter>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });

  it('should render sign in link', () => {
    render(
      <MemoryRouter>
        <OfferNotLoggedPage />
      </MemoryRouter>
    );

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});


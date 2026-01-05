import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import FavoritesPage from './favorites-page';
import rootReducer from '../store/reducer';
import { AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';

const mockOffer: Offer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 10,
    },
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
  },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test.jpg',
};

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    app: { city: 'Paris' },
    offers: { offers: [], isOffersDataLoading: false, offersDataError: null },
    user: {
      authorizationStatus: AuthorizationStatus.Auth,
      user: {
        email: 'test@example.com',
        token: 'token',
        name: 'Test User',
        avatarUrl: 'avatar.jpg',
        isPro: false,
      },
    },
    reviews: { reviews: [], isReviewsDataLoading: false },
    ...initialState,
  },
});

vi.mock('../store/action', async () => {
  const actual = await vi.importActual<typeof import('../store/action')>('../store/action');
  return {
    ...actual,
    fetchFavoriteOffersAction: vi.fn(() => async () => Promise.resolve()),
  };
});

describe('FavoritesPage component', () => {
  it('should render favorites page with header', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });

  it('should render favorite offers', () => {
    const store = createMockStore({
      offers: { offers: [mockOffer], isOffersDataLoading: false, offersDataError: null },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });

  it('should render spinner when loading', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FavoritesPage />
        </MemoryRouter>
      </Provider>
    );

    const spinner = document.querySelector('div[style*="border"]');
    expect(spinner).toBeInTheDocument();
  });
});


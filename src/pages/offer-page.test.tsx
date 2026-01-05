import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import OfferPage from './offer-page';
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
  isFavorite: false,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test.jpg',
  images: ['image1.jpg', 'image2.jpg'],
  bedrooms: 2,
  maxAdults: 4,
  goods: ['Wi-Fi', 'Heating'],
  host: {
    name: 'Host Name',
    avatarUrl: 'host.jpg',
    isPro: true,
  },
  description: 'Test description',
};

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    app: { city: 'Paris' },
    offers: { offers: [mockOffer], isOffersDataLoading: false, offersDataError: null },
    user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    reviews: { reviews: [], isReviewsDataLoading: false },
    ...initialState,
  },
});

vi.mock('../store/action', async () => {
  const actual = await vi.importActual<typeof import('../store/action')>('../store/action');
  return {
    ...actual,
    fetchOfferAction: vi.fn(() => async () => Promise.resolve()),
    fetchReviewsAction: vi.fn(() => async () => Promise.resolve()),
  };
});

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('OfferPage component', () => {
  it('should render spinner when loading', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/1']}>
          <OfferPage />
        </MemoryRouter>
      </Provider>
    );

    const spinner = document.querySelector('div[style*="border"]');
    expect(spinner).toBeInTheDocument();
  });

  it('should render offer not found when offer does not exist', async () => {
    const store = createMockStore({
      offers: { offers: [], isOffersDataLoading: false, offersDataError: null },
    });
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/offer/nonexistent']}>
          <OfferPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Offer not found')).toBeInTheDocument();
    });
  });
});


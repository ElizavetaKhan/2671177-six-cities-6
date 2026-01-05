import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MainPage from './main-page';
import rootReducer from '../store/reducer';
import { AuthorizationStatus } from '../const';

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    app: { city: 'Paris' },
    offers: { offers: [], isOffersDataLoading: false, offersDataError: null },
    user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    reviews: { reviews: [], isReviewsDataLoading: false },
    ...initialState,
  },
});

vi.mock('../store/action', async () => {
  const actual = await vi.importActual<typeof import('../store/action')>('../store/action');
  return {
    ...actual,
    fetchOffersAction: vi.fn(() => async () => Promise.resolve()),
  };
});

describe('MainPage component', () => {
  it('should render main page with header', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByAltText('6 cities logo').length).toBeGreaterThan(0);
  });

  it('should render cities list', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should render spinner when loading', () => {
    const store = createMockStore({
      offers: { offers: [], isOffersDataLoading: true, offersDataError: null },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    const spinner = document.querySelector('div[style*="border"]');
    expect(spinner).toBeInTheDocument();
  });

  it('should render empty content when no offers', () => {
    const store = createMockStore({
      offers: { offers: [], isOffersDataLoading: false, offersDataError: null },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});


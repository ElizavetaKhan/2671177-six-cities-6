import { describe, it, expect, beforeEach, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import axios, { AxiosInstance } from 'axios';
import { fetchOffersAction, checkAuthAction, loginAction, toggleFavoriteAction, fetchFavoriteOffersAction } from './action';
import rootReducer from './reducer';
import { Offer } from '../types/offer';
import { User } from '../types/user';
import { AuthorizationStatus } from '../const';
import type { RootState } from './index';

const mockOffer1: Offer = {
  id: '1',
  title: 'Test Offer 1',
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
};

const mockOffer2: Offer = {
  id: '2',
  title: 'Test Offer 2',
  type: 'house',
  price: 200,
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3676,
      longitude: 4.9041,
      zoom: 10,
    },
  },
  location: {
    latitude: 52.3676,
    longitude: 4.9041,
    zoom: 10,
  },
  isFavorite: true,
  isPremium: true,
  rating: 5.0,
  previewImage: 'test2.jpg',
};

const mockUser: User = {
  email: 'test@example.com',
  token: 'test-token',
  name: 'Test User',
  avatarUrl: 'avatar.jpg',
  isPro: false,
};

describe('fetchOffersAction', () => {
  let api: AxiosInstance;
  let mockAdapter: MockAdapter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'https://test.com',
    });
    mockAdapter = new MockAdapter(api);
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
  });

  it('should dispatch setOffersDataLoading(true), loadOffers(data), setOffersDataLoading(false) on success', async () => {
    const offers = [mockOffer1, mockOffer2];
    mockAdapter.onGet('/offers').reply(200, offers);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(fetchOffersAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.offers.offers).toEqual(offers);
    expect(state.offers.isOffersDataLoading).toBe(false);
    expect(state.offers.offersDataError).toBeNull();
  });

  it('should dispatch setOffersDataLoading(true), setOffersDataError(errorMessage), setOffersDataLoading(false) on error', async () => {
    mockAdapter.onGet('/offers').networkError();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(fetchOffersAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.offers.offers).toEqual([]);
    expect(state.offers.isOffersDataLoading).toBe(false);
    expect(state.offers.offersDataError).toBeTruthy();
  });
});

describe('checkAuthAction', () => {
  let api: AxiosInstance;
  let mockAdapter: MockAdapter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'https://test.com',
    });
    mockAdapter = new MockAdapter(api);
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
  });

  it('should dispatch requireAuthorization(Auth) and setUser(data) on success (200)', async () => {
    mockAdapter.onGet('/login').reply(200, mockUser);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(checkAuthAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.user.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user.user).toEqual(mockUser);
  });

  it('should dispatch requireAuthorization(NoAuth) and setUser(null) on error (401)', async () => {
    mockAdapter.onGet('/login').reply(401);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(checkAuthAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    expect(state.user.user).toBeNull();
  });
});

describe('loginAction', () => {
  let api: AxiosInstance;
  let mockAdapter: MockAdapter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'https://test.com',
    });
    mockAdapter = new MockAdapter(api);
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('should dispatch requireAuthorization(Auth) and setUser(data) on success', async () => {
    mockAdapter.onPost('/login').reply(200, mockUser);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(loginAction('test@example.com', 'password'));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.user.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(state.user.user).toEqual(mockUser);
  });

  it('should dispatch requireAuthorization(NoAuth) and throw error on failure', async () => {
    mockAdapter.onPost('/login').reply(401);

    await expect(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      store.dispatch(loginAction('test@example.com', 'wrong-password'))
    ).rejects.toBeDefined();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.user.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
  });
});

describe('toggleFavoriteAction', () => {
  let api: AxiosInstance;
  let mockAdapter: MockAdapter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: any;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'https://test.com',
    });
    mockAdapter = new MockAdapter(api);
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });
  });

  it('should dispatch updateOffer with updated offer on success', async () => {
    const updatedOffer = { ...mockOffer1, isFavorite: true };
    mockAdapter.onPost(`/favorite/${mockOffer1.id}/1`).reply(200, updatedOffer);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(toggleFavoriteAction(mockOffer1.id, true));

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    const offer = state.offers.offers.find((o) => o.id === mockOffer1.id);
    expect(offer).toEqual(updatedOffer);
  });
});

describe('fetchFavoriteOffersAction', () => {
  let api: AxiosInstance;
  let mockAdapter: MockAdapter;

  beforeEach(() => {
    api = axios.create({
      baseURL: 'https://test.com',
    });
    mockAdapter = new MockAdapter(api);
  });

  it('should dispatch loadOffers with updated offers (add new, update existing)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store: any = configureStore({
      reducer: rootReducer,
      preloadedState: {
        offers: {
          offers: [mockOffer1],
          isOffersDataLoading: false,
          offersDataError: null,
        },
        app: { city: 'Paris' },
        user: {
          authorizationStatus: AuthorizationStatus.Unknown,
          user: null,
        },
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk: {
            extraArgument: api,
          },
        }),
    });

    const favoriteOffers = [{ ...mockOffer1, isFavorite: false }, mockOffer2];
    mockAdapter.onGet('/favorite').reply(200, favoriteOffers);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    await store.dispatch(fetchFavoriteOffersAction());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const state = store.getState() as RootState;
    expect(state.offers.offers).toHaveLength(2);
    const updatedOffer1 = state.offers.offers.find((o) => o.id === mockOffer1.id);
    expect(updatedOffer1?.isFavorite).toBe(true);
    const addedOffer2 = state.offers.offers.find((o) => o.id === mockOffer2.id);
    expect(addedOffer2).toEqual({ ...mockOffer2, isFavorite: true });
  });
});


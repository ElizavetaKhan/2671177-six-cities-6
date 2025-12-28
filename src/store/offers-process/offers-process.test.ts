import { describe, it, expect } from 'vitest';
import offersProcess from './offers-process';
import { loadOffers, setOffersDataLoading, setOffersDataError, updateOfferFavorite, updateOffer } from '../action';
import { Offer } from '../../types/offer';

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

describe('offers-process reducer', () => {
  it('should return initial state', () => {
    const state = offersProcess(undefined, { type: 'unknown' });
    expect(state).toEqual({
      offers: [],
      isOffersDataLoading: false,
      offersDataError: null,
    });
  });

  describe('loadOffers', () => {
    it('should load offers array', () => {
      const initialState = {
        offers: [],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const offers = [mockOffer1, mockOffer2];
      const action = loadOffers(offers);
      const state = offersProcess(initialState, action);

      expect(state.offers).toEqual(offers);
      expect(state.offers).toHaveLength(2);
    });

    it('should replace existing offers array', () => {
      const initialState = {
        offers: [mockOffer1],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const newOffers = [mockOffer2];
      const action = loadOffers(newOffers);
      const state = offersProcess(initialState, action);

      expect(state.offers).toEqual(newOffers);
      expect(state.offers).toHaveLength(1);
      expect(state.offers[0].id).toBe('2');
    });
  });

  describe('setOffersDataLoading', () => {
    it('should set isOffersDataLoading to true', () => {
      const initialState = {
        offers: [],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const action = setOffersDataLoading(true);
      const state = offersProcess(initialState, action);

      expect(state.isOffersDataLoading).toBe(true);
    });

    it('should set isOffersDataLoading to false', () => {
      const initialState = {
        offers: [],
        isOffersDataLoading: true,
        offersDataError: null,
      };
      const action = setOffersDataLoading(false);
      const state = offersProcess(initialState, action);

      expect(state.isOffersDataLoading).toBe(false);
    });
  });

  describe('setOffersDataError', () => {
    it('should set error message', () => {
      const initialState = {
        offers: [],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const errorMessage = 'Test error message';
      const action = setOffersDataError(errorMessage);
      const state = offersProcess(initialState, action);

      expect(state.offersDataError).toBe(errorMessage);
    });

    it('should clear error (null)', () => {
      const initialState = {
        offers: [],
        isOffersDataLoading: false,
        offersDataError: 'Previous error',
      };
      const action = setOffersDataError(null);
      const state = offersProcess(initialState, action);

      expect(state.offersDataError).toBeNull();
    });
  });

  describe('updateOfferFavorite', () => {
    it('should update isFavorite for existing offer', () => {
      const initialState = {
        offers: [mockOffer1],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const action = updateOfferFavorite({ id: '1', isFavorite: true });
      const state = offersProcess(initialState, action);

      expect(state.offers[0].isFavorite).toBe(true);
    });

    it('should not change anything if offer not found', () => {
      const initialState = {
        offers: [mockOffer1],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const action = updateOfferFavorite({ id: '999', isFavorite: true });
      const state = offersProcess(initialState, action);

      expect(state.offers).toEqual(initialState.offers);
      expect(state.offers[0].isFavorite).toBe(false);
    });
  });

  describe('updateOffer', () => {
    it('should update existing offer', () => {
      const initialState = {
        offers: [mockOffer1],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const updatedOffer = { ...mockOffer1, title: 'Updated Title', price: 150 };
      const action = updateOffer(updatedOffer);
      const state = offersProcess(initialState, action);

      expect(state.offers).toHaveLength(1);
      expect(state.offers[0].title).toBe('Updated Title');
      expect(state.offers[0].price).toBe(150);
    });

    it('should add new offer if not found in array', () => {
      const initialState = {
        offers: [mockOffer1],
        isOffersDataLoading: false,
        offersDataError: null,
      };
      const action = updateOffer(mockOffer2);
      const state = offersProcess(initialState, action);

      expect(state.offers).toHaveLength(2);
      expect(state.offers.find((o) => o.id === '2')).toEqual(mockOffer2);
    });
  });
});


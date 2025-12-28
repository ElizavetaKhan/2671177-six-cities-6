import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { loadOffers, setOffersDataLoading, setOffersDataError, updateOfferFavorite, updateOffer } from '../action';

interface OffersState {
  offers: Offer[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
}

const initialState: OffersState = {
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
};

const offersProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoading, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOffersDataError, (state, action) => {
      state.offersDataError = action.payload;
    })
    .addCase(updateOfferFavorite, (state, action) => {
      const { id, isFavorite } = action.payload;
      const offer = state.offers.find((o) => o.id === id);
      if (offer) {
        offer.isFavorite = isFavorite;
      }
    })
    .addCase(updateOffer, (state, action) => {
      const updatedOffer = action.payload;
      const index = state.offers.findIndex((o) => o.id === updatedOffer.id);
      if (index !== -1) {
        state.offers[index] = updatedOffer;
      } else {
        state.offers.push(updatedOffer);
      }
    });
});

export default offersProcess;


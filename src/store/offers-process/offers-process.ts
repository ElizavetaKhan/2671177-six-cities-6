import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { loadOffers, setOffersDataLoading, setOffersDataError } from '../action';

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
    });
});

export default offersProcess;


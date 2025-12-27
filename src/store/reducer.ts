import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { changeCity, loadOffers, setOffersDataLoading, setOffersDataError } from './action';

interface State {
  city: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
}

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
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

export default appReducer;

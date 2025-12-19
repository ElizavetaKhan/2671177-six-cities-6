import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';
import { changeCity, loadOffers } from './action';

interface State {
  city: string;
  offers: Offer[];
}

const initialState: State = {
  city: 'Paris',
  offers: [],
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export default appReducer;

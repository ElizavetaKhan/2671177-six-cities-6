import { createReducer } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { User } from '../types/user';
import { AuthorizationStatus } from '../const';
import { TOKEN_KEY } from '../services/api';
import { changeCity, loadOffers, setOffersDataLoading, setOffersDataError, requireAuthorization, setUser, logout } from './action';

interface State {
  city: string;
  offers: Offer[];
  isOffersDataLoading: boolean;
  offersDataError: string | null;
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: State = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  offersDataError: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
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
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
      localStorage.removeItem(TOKEN_KEY);
    });
});

export default appReducer;

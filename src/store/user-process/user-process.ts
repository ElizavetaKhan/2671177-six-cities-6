import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../types/user';
import { AuthorizationStatus } from '../../const';
import { requireAuthorization, setUser, logout } from '../action';

interface UserState {
  authorizationStatus: AuthorizationStatus;
  user: User | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.user = null;
    });
});

export default userProcess;


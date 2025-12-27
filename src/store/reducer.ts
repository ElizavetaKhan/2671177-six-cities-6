import { combineReducers } from '@reduxjs/toolkit';
import appProcess from './app-process/app-process';
import offersProcess from './offers-process/offers-process';
import userProcess from './user-process/user-process';

const rootReducer = combineReducers({
  app: appProcess,
  offers: offersProcess,
  user: userProcess,
});

export default rootReducer;

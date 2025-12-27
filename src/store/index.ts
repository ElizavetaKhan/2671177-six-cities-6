import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducer';
import { createAPI } from '../services/api';

const api = createAPI();

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

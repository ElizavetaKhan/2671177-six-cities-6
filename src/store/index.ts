import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducer';
import { createAPI, setupResponseInterceptor } from '../services/api';

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

setupResponseInterceptor(api, store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

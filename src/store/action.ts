import { createAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, RootState } from './index';
import { Offer } from '../types/offer';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<Offer[]>('app/loadOffers');

export const setOffersDataLoading = createAction<boolean>('app/setOffersDataLoading');
export const setOffersDataError = createAction<string | null>('app/setOffersDataError');

export const fetchOffersAction = () =>
  async (dispatch: AppDispatch, _getState: () => RootState, api: AxiosInstance) => {
    dispatch(setOffersDataLoading(true));
    dispatch(setOffersDataError(null));
    try {
      const { data } = await api.get<Offer[]>('/offers');
      dispatch(loadOffers(data));
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Не удалось загрузить данные. Сервер недоступен.';
      dispatch(setOffersDataError(errorMessage));
    } finally {
      dispatch(setOffersDataLoading(false));
    }
  };

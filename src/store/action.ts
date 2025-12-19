import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../mocks/offers';

export const changeCity = createAction<string>('app/changeCity');

export const loadOffers = createAction<Offer[]>('app/loadOffers');

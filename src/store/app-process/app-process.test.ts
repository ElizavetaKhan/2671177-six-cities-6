import { describe, it, expect } from 'vitest';
import appProcess from './app-process';
import { changeCity } from '../action';

describe('app-process reducer', () => {
  it('should return initial state', () => {
    const state = appProcess(undefined, { type: 'unknown' });
    expect(state).toEqual({ city: 'Paris' });
  });

  it('should handle changeCity action', () => {
    const initialState = { city: 'Paris' };
    const newCity = 'Amsterdam';
    const action = changeCity(newCity);
    const state = appProcess(initialState, action);

    expect(state.city).toBe(newCity);
    expect(state).toEqual({ city: newCity });
  });
});


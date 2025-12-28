import { describe, it, expect } from 'vitest';
import userProcess from './user-process';
import { requireAuthorization, setUser, logout } from '../action';
import { AuthorizationStatus } from '../../const';
import { User } from '../../types/user';

const mockUser: User = {
  email: 'test@example.com',
  token: 'test-token',
  name: 'Test User',
  avatarUrl: 'avatar.jpg',
  isPro: false,
};

describe('user-process reducer', () => {
  it('should return initial state', () => {
    const state = userProcess(undefined, { type: 'unknown' });
    expect(state).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    });
  });

  describe('requireAuthorization', () => {
    it('should set authorization status to Auth', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      };
      const action = requireAuthorization(AuthorizationStatus.Auth);
      const state = userProcess(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.Auth);
    });

    it('should set authorization status to NoAuth', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      };
      const action = requireAuthorization(AuthorizationStatus.NoAuth);
      const state = userProcess(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
    });

    it('should set authorization status to Unknown', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      };
      const action = requireAuthorization(AuthorizationStatus.Unknown);
      const state = userProcess(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.Unknown);
    });
  });

  describe('setUser', () => {
    it('should set user data', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
      };
      const action = setUser(mockUser);
      const state = userProcess(initialState, action);

      expect(state.user).toEqual(mockUser);
    });

    it('should set user to null (logout)', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      };
      const action = setUser(null);
      const state = userProcess(initialState, action);

      expect(state.user).toBeNull();
    });
  });

  describe('logout', () => {
    it('should reset authorizationStatus to NoAuth and user to null', () => {
      const initialState = {
        authorizationStatus: AuthorizationStatus.Auth,
        user: mockUser,
      };
      const action = logout();
      const state = userProcess(initialState, action);

      expect(state.authorizationStatus).toBe(AuthorizationStatus.NoAuth);
      expect(state.user).toBeNull();
    });
  });
});


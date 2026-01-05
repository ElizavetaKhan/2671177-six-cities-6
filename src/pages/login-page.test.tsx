import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './login-page';
import rootReducer from '../store/reducer';
import { AuthorizationStatus } from '../const';

const createMockStore = (initialState = {}) => configureStore({
  reducer: rootReducer,
  preloadedState: {
    app: { city: 'Paris' },
    offers: { offers: [], isOffersDataLoading: false, offersDataError: null },
    user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
    reviews: { reviews: [], isReviewsDataLoading: false },
    ...initialState,
  },
});

vi.mock('../store/action', async () => {
  const actual = await vi.importActual<typeof import('../store/action')>('../store/action');
  return {
    ...actual,
    loginAction: vi.fn(() => async () => Promise.resolve()),
  };
});

describe('LoginPage component', () => {
  it('should render login form', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });

  it('should allow typing email and password', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('should show error for invalid password', async () => {
    const user = userEvent.setup();
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/E-mail/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, '123456');
    await user.click(submitButton);

    expect(screen.getByText(/Password must contain at least one letter and one digit/i)).toBeInTheDocument();
  });
});


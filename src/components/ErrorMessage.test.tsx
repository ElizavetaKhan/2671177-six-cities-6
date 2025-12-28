import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage component', () => {
  it('should render component with message prop', () => {
    const message = 'Test error message';
    render(<ErrorMessage message={message} />);

    expect(screen.getByText('Ошибка загрузки данных')).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText('Пожалуйста, проверьте подключение к интернету и попробуйте обновить страницу.')).toBeInTheDocument();
  });

  it('should display the passed message', () => {
    const customMessage = 'Custom error message for testing';
    render(<ErrorMessage message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });
});


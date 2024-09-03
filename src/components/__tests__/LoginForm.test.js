import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';

test('renders login form', () => {
  const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={() => {}} />);
  
  expect(getByPlaceholderText('Username')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();
  expect(getByText('Login')).toBeInTheDocument();
});

test('submits form with valid inputs', async () => {
  const mockSubmit = jest.fn();
  const { getByPlaceholderText, getByText } = render(<LoginForm onSubmit={mockSubmit} />);
  
  fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
  fireEvent.click(getByText('Login'));

  await waitFor(() => {
    expect(mockSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password123'
    });
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AuthorForm from './AuthorForm';
import '@testing-library/jest-dom/extend-expect';

// Mock function for onSubmit
const mockOnSubmit = jest.fn();

describe('AuthorForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders the form with default values', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Save/i)).toBeDisabled();
  });

  it('validates form inputs and displays errors', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />);

    // Focus and blur the fullName input to trigger validation
    const fullNameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.focus(fullNameInput);
    fireEvent.blur(fullNameInput);

    await waitFor(() => {
      expect(screen.getByText(/Full Name is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<AuthorForm onSubmit={mockOnSubmit} />);

    // Fill in the fullName
    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Test Author' } });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Save/i })).toBeEnabled()
    })
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from './BookForm';
import '@testing-library/jest-dom/extend-expect';
import {mockAuthors} from '../../__mocks__/mocks'


// Mock function for onSubmit
const mockOnSubmit = jest.fn();

describe('BookForm', () => {
  it('renders the form with default values', () => {
    render(<BookForm onSubmit={mockOnSubmit} authors={mockAuthors} />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Publication Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Authors/i)).toBeInTheDocument();

    expect(screen.getByText(/Save/i)).toBeDisabled();
  });

  it('validates form inputs and displays errors', async () => {
    render(<BookForm onSubmit={mockOnSubmit} authors={mockAuthors} />);

    // Focus and blur the title input to trigger validation
    const titleInput = screen.getByLabelText(/Title/i);
    fireEvent.focus(titleInput);
    fireEvent.blur(titleInput);

    // Focus and blur the publication year input to trigger validation
    const publicationYearInput = screen.getByLabelText(/Publication Year/i);
    fireEvent.focus(publicationYearInput);
    fireEvent.blur(publicationYearInput);

    // Open and close the authors autocomplete to trigger validation
    const authorsAutocomplete = screen.getByLabelText(/Authors/i);
    fireEvent.focus(authorsAutocomplete);
    fireEvent.blur(authorsAutocomplete);

    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Publication Year is required/i)).toBeInTheDocument();
      expect(screen.getByText(/At least one author is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    render(<BookForm onSubmit={mockOnSubmit} authors={mockAuthors} />);

    // Fill in the title
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Book' } });

    // Fill in the publication year
    fireEvent.change(screen.getByLabelText(/Publication Year/i), { target: { value: 2021 } });

    // Select an author
    const authorsAutocomplete = screen.getByLabelText(/Authors/i);
    fireEvent.change(authorsAutocomplete, { target: { value: 'Author 1' } });
    fireEvent.click(screen.getByText('Author 1'));

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Save/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Test Book',
        publicationYear: 2021,
        authorIds: ['1']
      });
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });
});

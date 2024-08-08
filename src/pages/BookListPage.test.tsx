import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookListPage from './BookListPage';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';
import {mockAuthors, mockBooks} from '../__mocks__/mocks'

// Mocking hooks
jest.mock('../hooks/useBooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../hooks/useAuthors', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('BookListPage', () => {
  beforeEach(() => {
    (useBooks as jest.Mock).mockReturnValue({
      books: mockBooks,
      deleteBook: jest.fn(),
    });
    (useAuthors as jest.Mock).mockReturnValue({
      authors: mockAuthors,
    });
  });

  it('renders the component with books and authors', () => {
    render(
      <MemoryRouter>
        <BookListPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Book List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Book/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Book 2/i)).toBeInTheDocument();
  });
});

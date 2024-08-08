import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthorListPage from './AuthorListPage';
import useAuthors from '../hooks/useAuthors';
import useBooks from '../hooks/useBooks';
import {mockAuthors, mockBooks} from '../__mocks__/mocks'

// Mocking hooks
jest.mock('../hooks/useAuthors', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../hooks/useBooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('AuthorListPage', () => {
  beforeEach(() => {
    (useAuthors as jest.Mock).mockReturnValue({
      authors: mockAuthors,
      deleteAuthor: jest.fn(),
    });
    (useBooks as jest.Mock).mockReturnValue({
      books: mockBooks,
    });
  });

  it('renders the component with authors and the Add Author button', () => {
    render(
      <MemoryRouter>
        <AuthorListPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Author List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Author/i)).toBeInTheDocument();
    expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Author 2/i)).toBeInTheDocument();
  });
});

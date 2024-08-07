import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';
import ConfirmationModal from '../components/ConfirmationModal';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  SelectChangeEvent
} from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';
import Table from '../components/Table';

const BookListPage: React.FC = () => {
  const { books, deleteBook } = useBooks();
  const { authors } = useAuthors();

  const [filterAuthorId, setFilterAuthorId] = useState<string | null>(null);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (filterAuthorId) {
      setFilteredBooks(books.filter(book => book.authorIds.includes(filterAuthorId)));
    } else {
      setFilteredBooks(books);
    }
  }, [books, filterAuthorId]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterAuthorId(event.target.value);
  };

  const openConfirmationModal = (id: string) => {
    setBookToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (bookToDelete) {
      deleteBook(bookToDelete);
    }
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setBookToDelete(null);
  };

  const columns = [
    { id: 'id', label: 'ID', render: (row: any) => row.id },
    { id: 'title', label: 'Title', render: (row: any) => row.title },
    {
      id: 'authors', label: 'Author(s)', render: (row: any) =>
        row.authorIds.map((id: string) => {
          const author = authors.find(a => a.id === id);
          return author ? author.fullName : 'Unknown Author';
        }).join(', ')
    },
    { id: 'publicationYear', label: 'Publication Year', render: (row: any) => row.publicationYear },
  ];

  const actions = (row: any) => (
    <>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/Books/Edit/${row.id}`}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => openConfirmationModal(row.id)}
      >
        Delete
      </Button>
    </>
  );

  return (
    <Container>
      <Breadcrumbs />
      <Typography variant="h4" gutterBottom>Book List</Typography>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="Books/Add"
      >
        Add Book
      </Button>

      <FormControl variant="outlined" fullWidth style={{ marginBottom: '1rem' }}>
        <InputLabel>Filter by Author</InputLabel>
        <Select
          value={filterAuthorId || ''}
          onChange={handleFilterChange}
          label="Filter by Author"
        >
          <MenuItem value=""><em>All</em></MenuItem>
          {authors.map(author => (
            <MenuItem key={author.id} value={author.id}>
              {author.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Table columns={columns} data={filteredBooks} actions={actions} />

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this book?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Container>
  );
};

export default BookListPage;

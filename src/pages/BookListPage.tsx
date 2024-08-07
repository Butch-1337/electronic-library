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
  SelectChangeEvent,
  Box
} from '@mui/material';
import Page from '../components/Page';
import Table from '../components/Table';

const BookListPage: React.FC = () => {
  const { books, deleteBook } = useBooks();
  const { authors } = useAuthors();

  const [filterAuthorId, setFilterAuthorId] = useState<string | null>(null);
  const [tempFilterAuthorId, setTempFilterAuthorId] = useState<string | null>(null);
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
    setTempFilterAuthorId(event.target.value);
  };

  const applyFilter = () => {
    setFilterAuthorId(tempFilterAuthorId);
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
    <Box sx={{display: 'flex'}}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/Books/Edit/${row.id}`}
        sx={{marginRight: '16px'}}
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
    </Box>
  );

  return (
    <Page title="Book List">
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="Books/Add"
        sx={{ marginBottom: '16px' }}
      >
        Add Book
      </Button>

      <Box sx={{display: 'flex'}}>
        <FormControl
          variant="outlined"
          sx={{
            minWidth: '200px',
            marginRight: '16px'
          }}
        >
          <InputLabel>Filter by Author</InputLabel>
          <Select
            value={tempFilterAuthorId || ''}
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
        <Button
          variant="contained"
          color="primary"
          onClick={applyFilter}
          sx={{ marginBottom: '16px' }}
        >
          Apply
        </Button>
      </Box>

      <Table columns={columns} data={filteredBooks} actions={actions} />

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this book?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Page>
  );
};

export default BookListPage;

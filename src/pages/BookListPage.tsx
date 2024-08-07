import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';
import ConfirmationModal from '../components/ConfirmationModal';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Select, MenuItem, FormControl, InputLabel, Container, Typography } from '@mui/material';
import Breadcrumbs from '../components/Breadcrumbs';

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

  const handleFilterChange = (event: any) => {
    setFilterAuthorId(event.target.value as string);
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilterAuthorId(filterAuthorId)}
          style={{ marginTop: '0.5rem' }}
        >
          Apply
        </Button>
      </FormControl>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author(s)</TableCell>
            <TableCell>Publication Year</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredBooks.map(book => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>
                {book.authorIds.map(id => {
                  const author = authors.find(a => a.id === id);
                  return author ? author.fullName : 'Unknown Author';
                }).join(', ')}
              </TableCell>
              <TableCell>{book.publicationYear}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/Books/Edit/${book.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => openConfirmationModal(book.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

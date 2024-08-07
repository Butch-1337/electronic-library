import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';
import BookForm from '../components/BookForm';
import BackButton from '../components/BackButton';
import { v4 as uuidv4 } from 'uuid';
import Breadcrumbs from '../components/Breadcrumbs'
import {Typography} from '@mui/material'

const AddEditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { books, addBook, updateBook } = useBooks();
  const { authors } = useAuthors();
  const book = books.find(b => b.id === id);

  const handleSubmit = (data: any) => {
    if (book) {
      updateBook({ ...data, id: book.id });
    } else {
      addBook({ ...data, id: uuidv4() });
    }
    history.push('/Books');
  };

  return (
    <div>
      <Breadcrumbs />
      <Typography variant="h4" gutterBottom>
        {book ? "Edit Book" : "Add Book"}
      </Typography>
      <BookForm onSubmit={handleSubmit} defaultValues={book} authors={authors} />
    </div>
  );
};

export default AddEditBookPage;

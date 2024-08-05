import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';
import BookForm from '../components/BookForm';
import BackButton from '../components/BackButton';
import { v4 as uuidv4 } from 'uuid';

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
    history.push('/books');
  };

  return (
    <div>
      <BackButton />
      <h1>{book ? "Edit Book" : "Add Book"}</h1>
      <BookForm onSubmit={handleSubmit} defaultValues={book} authors={authors} />
    </div>
  );
};

export default AddEditBookPage;

import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  publicationYear: number;
  authorIds: string[];
}

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const addBook = (book: Book) => setBooks([...books, book]);

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  return {
    books,
    addBook,
    updateBook,
    deleteBook
  };
};

export default useBooks;

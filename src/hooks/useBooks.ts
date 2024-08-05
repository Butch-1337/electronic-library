import { useState, useEffect } from 'react';

interface Book {
  id: string;
  title: string;
  authorIds: string[];
  publicationYear: string;
}

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = sessionStorage.getItem('books');
    return savedBooks ? JSON.parse(savedBooks) : [];
  });

  const saveToSessionStorage = (books: Book[]) => {
    sessionStorage.setItem('books', JSON.stringify(books));
  };

  const addBook = (book: Book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    saveToSessionStorage(updatedBooks);
  };

  const updateBook = (updatedBook: Book) => {
    const updatedBooks = books.map(book =>
      book.id === updatedBook.id ? updatedBook : book
    );
    setBooks(updatedBooks);
    saveToSessionStorage(updatedBooks);
  };

  const deleteBook = (id: string) => {
    const updatedBooks = books.filter(book => book.id !== id);
    setBooks(updatedBooks);
    saveToSessionStorage(updatedBooks);
  };

  useEffect(() => {
    saveToSessionStorage(books);
  }, [books]);

  return {
    books,
    addBook,
    updateBook,
    deleteBook,
  };
};

export default useBooks;

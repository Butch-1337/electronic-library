import { useState, useEffect } from 'react';

export interface Author {
  id: string;
  fullName: string;
}

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>(() => {
    const savedAuthors = sessionStorage.getItem('authors');
    return savedAuthors ? JSON.parse(savedAuthors) : [];
  });

  const saveToSessionStorage = (authors: Author[]) => {
    sessionStorage.setItem('authors', JSON.stringify(authors));
  };

  const addAuthor = (author: Author) => {
    const updatedAuthors = [...authors, author];
    setAuthors(updatedAuthors);
    saveToSessionStorage(updatedAuthors);
  };

  const updateAuthor = (updatedAuthor: Author) => {
    const updatedAuthors = authors.map(author =>
      author.id === updatedAuthor.id ? updatedAuthor : author
    );
    setAuthors(updatedAuthors);
    saveToSessionStorage(updatedAuthors);
  };

  const deleteAuthor = (id: string) => {
    const updatedAuthors = authors.filter(author => author.id !== id);
    setAuthors(updatedAuthors);
    saveToSessionStorage(updatedAuthors);
  };

  useEffect(() => {
    saveToSessionStorage(authors);
  }, [authors]);

  return {
    authors,
    addAuthor,
    updateAuthor,
    deleteAuthor,
  };
};

export default useAuthors;

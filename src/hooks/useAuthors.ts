import { useState } from 'react';

interface Author {
  id: string;
  fullName: string;
}

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  const addAuthor = (author: Author) => setAuthors([...authors, author]);

  const updateAuthor = (updatedAuthor: Author) => {
    setAuthors(authors.map(author => author.id === updatedAuthor.id ? updatedAuthor : author));
  };

  const deleteAuthor = (id: string) => {
    setAuthors(authors.filter(author => author.id !== id));
  };

  return {
    authors,
    addAuthor,
    updateAuthor,
    deleteAuthor
  };
};

export default useAuthors;

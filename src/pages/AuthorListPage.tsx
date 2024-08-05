import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import useBooks from '../hooks/useBooks';
import BackButton from '../components/BackButton';
import ConfirmationModal from '../components/ConfirmationModal';

const AuthorListPage: React.FC = () => {
  const { authors, deleteAuthor } = useAuthors();
  const { books } = useBooks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorToDelete, setAuthorToDelete] = useState<string | null>(null);

  // Calculate the number of books for each author
  const getNumberOfBooks = (authorId: string) => {
    return books.filter(book => book.authorIds.includes(authorId)).length;
  };

  const openConfirmationModal = (id: string) => {
    setAuthorToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (authorToDelete) {
      deleteAuthor(authorToDelete);
    }
    setIsModalOpen(false);
    setAuthorToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setAuthorToDelete(null);
  };

  return (
    <div>
      <BackButton />
      <h1>Author List</h1>
      <Link to="authors/add">Add Author</Link>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Number of Books</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {authors.map(author => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.fullName}</td>
            <td>{getNumberOfBooks(author.id)}</td>
            <td>
              <Link to={`/edit-author/${author.id}`}>Edit</Link>
              <button onClick={() => openConfirmationModal(author.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this author?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default AuthorListPage;

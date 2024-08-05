import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';
import BackButton from '../components/BackButton';
import ConfirmationModal from '../components/ConfirmationModal';

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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  return (
    <div>
      <BackButton />
      <h1>Book List</h1>
      <Link to="books/add">Add Book</Link>

      <div>
        <label>Filter by Author</label>
        <select value={filterAuthorId || ''} onChange={handleFilterChange}>
          <option value="">All</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>
              {author.fullName}
            </option>
          ))}
        </select>
        <button onClick={() => setFilterAuthorId(filterAuthorId)}>Apply</button>
      </div>

      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Publication Year</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {filteredBooks.map(book => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.authorIds.map(id => authors.find(a => a.id === id)?.fullName).join(', ')}</td>
            <td>{book.publicationYear}</td>
            <td>
              <Link to={`/edit-book/${book.id}`}>Edit</Link>
              <button onClick={() => openConfirmationModal(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this book?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default BookListPage;

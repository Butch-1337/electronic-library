import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors';

const BookListPage: React.FC = () => {
  const { books, deleteBook } = useBooks();
  const { authors } = useAuthors();
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>(undefined);

  const filteredBooks = selectedAuthor
    ? books.filter(book => book.authorIds.includes(selectedAuthor))
    : books;

  return (
    <div>
      <h1>Books</h1>
      <div>
        <select onChange={e => setSelectedAuthor(e.target.value)} value={selectedAuthor}>
          <option value="">All Authors</option>
          {authors.map(author => (
            <option key={author.id} value={author.id}>{author.fullName}</option>
          ))}
        </select>
        <button onClick={() => setSelectedAuthor(undefined)}>Apply</button>
      </div>
      <Link to="/books/add">Add Book</Link>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Authors</th>
          <th>Publication Year</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {filteredBooks.map(book => (
          <tr key={book.id}>
            <td>{book.id}</td>
            <td>{book.title}</td>
            <td>{book.authorIds.map(id => authors.find(a => a.id === id)?.fullName).join(", ")}</td>
            <td>{book.publicationYear}</td>
            <td>
              <Link to={`/books/${book.id}/edit`}>Edit</Link>
              <button onClick={() => deleteBook(book.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookListPage;

import React from 'react';
import { Link } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import BackButton from '../components/BackButton';

const AuthorListPage: React.FC = () => {
  const { authors, deleteAuthor } = useAuthors();

  return (
    <div>
      <BackButton />
      <h1>Authors</h1>
      <Link to="/authors/add">Add Author</Link>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {authors.map(author => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.fullName}</td>
            <td>
              <Link to={`/authors/${author.id}/edit`}>Edit</Link>
              <button onClick={() => deleteAuthor(author.id)}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorListPage;

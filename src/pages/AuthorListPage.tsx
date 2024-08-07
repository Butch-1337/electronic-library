import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import useBooks from '../hooks/useBooks';
import {Button, Table, TableBody, TableCell, TableHead, TableRow, Typography} from '@mui/material';
import ConfirmationModal from '../components/ConfirmationModal';
import Breadcrumbs from '../components/Breadcrumbs'

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
      <Breadcrumbs />
      <Typography variant="h4" gutterBottom>
        Author List
      </Typography>

      <div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="Authors/Add"
        >
          Add Author
        </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Number of Books</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map(author => (
            <TableRow key={author.id}>
              <TableCell>{author.id}</TableCell>
              <TableCell>{author.fullName}</TableCell>
              <TableCell>{getNumberOfBooks(author.id)}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to={`/Authors/Edit/${author.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => openConfirmationModal(author.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

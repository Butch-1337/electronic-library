import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import useBooks from '../hooks/useBooks';
import {Box, Button} from '@mui/material';
import ConfirmationModal from '../components/ConfirmationModal';
import Page from '../components/Page';
import Table from '../components/Table';

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

  const columns = [
    { id: 'id', label: 'ID', render: (row: any) => row.id },
    { id: 'fullName', label: 'Full Name', render: (row: any) => row.fullName },
    {
      id: 'numberOfBooks', label: 'Number of Books', render: (row: any) =>
        getNumberOfBooks(row.id)
    },
  ];

  const actions = (row: any) => (
    <Box sx={{display: 'flex'}}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/Authors/Edit/${row.id}`}
        sx={{marginRight: '16px'}}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => openConfirmationModal(row.id)}
      >
        Delete
      </Button>
    </Box>
  );

  return (
    <Page title="Author List">
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="Authors/Add"
        sx={{ marginBottom: '16px' }}
      >
        Add Author
      </Button>

      <Table columns={columns} data={authors} actions={actions} />

      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this author?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Page>
  );
};

export default AuthorListPage;

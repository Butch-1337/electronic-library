import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import AuthorForm from '../components/AuthorForm';
import { v4 as uuidv4 } from 'uuid';
import Breadcrumbs from '../components/Breadcrumbs'
import {Typography} from '@mui/material'

const AddEditAuthorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { authors, addAuthor, updateAuthor } = useAuthors();
  const author = authors.find(a => a.id === id);

  const handleSubmit = (data: any) => {
    if (author) {
      updateAuthor({ ...data, id: author.id });
    } else {
      addAuthor({ ...data, id: uuidv4() });
    }
    history.push('/Authors');
  };

  return (
    <div>
      <Breadcrumbs />
      <Typography variant="h4" gutterBottom>
        {author ? "Edit Author" : "Add Author"}
      </Typography>

      <AuthorForm onSubmit={handleSubmit} defaultValues={author} />
    </div>
  );
};

export default AddEditAuthorPage;

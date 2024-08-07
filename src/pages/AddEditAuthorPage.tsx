import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import AuthorForm from '../components/forms/AuthorForm';
import { v4 as uuidv4 } from 'uuid';
import Page from '../components/Page';

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
    <Page title={author ? "Edit Author" : "Add Author"}>
      <AuthorForm onSubmit={handleSubmit} defaultValues={author} />
    </Page>
  );
};

export default AddEditAuthorPage;

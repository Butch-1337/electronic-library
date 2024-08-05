import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useAuthors from '../hooks/useAuthors';
import AuthorForm from '../components/AuthorForm';
import BackButton from '../components/BackButton';
import { v4 as uuidv4 } from 'uuid';

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
    history.push('/authors');
  };

  return (
    <div>
      <BackButton />
      <h1>{author ? "Edit Author" : "Add Author"}</h1>
      <AuthorForm onSubmit={handleSubmit} defaultValues={author} />
    </div>
  );
};

export default AddEditAuthorPage;

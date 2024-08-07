import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Author } from '../hooks/useAuthors';
import { TextField, Button, FormControl, Autocomplete } from '@mui/material';

interface BookFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  authors: Author[];
}

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  publicationYear: yup.string().required('Publication Year is required'),
  authorIds: yup.array().of(yup.string().required()).required('At least one author is required'),
});

const BookForm: React.FC<BookFormProps> = ({ onSubmit, defaultValues, authors }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: defaultValues?.title || '',
      publicationYear: defaultValues?.publicationYear || '',
      authorIds: defaultValues?.authorIds || [],
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin="normal">
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              error={!!errors.title}
              helperText={errors.title?.message as string}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Controller
          name="publicationYear"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Publication Year"
              error={!!errors.publicationYear}
              helperText={errors.publicationYear?.message as string}
            />
          )}
        />
      </FormControl>

      <FormControl fullWidth margin="normal">
        <Controller
          name="authorIds"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple
              options={authors}
              getOptionLabel={(option) => option.fullName}
              onChange={(_, value) => field.onChange(value.map((author: Author) => author.id))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Authors"
                  error={!!errors.authorIds}
                  helperText={errors.authorIds?.message as string}
                />
              )}
            />
          )}
        />
      </FormControl>

      <Button variant="contained" color="primary" type="submit">
        Save
      </Button>
    </form>
  );
};

export default BookForm;

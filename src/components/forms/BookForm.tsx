import React from 'react';
import {useForm, Controller, SubmitHandler, Resolver} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  FormControl,
  FormHelperText,
  Autocomplete,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Author } from '../../hooks/useAuthors';
import CancelButton from '../CancelButton'

// Define the shape of form data
interface FormData {
  title: string;
  publicationYear: number | null;
  authorIds: string[];
}

// Define the schema for validation
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  publicationYear: yup.number()
    .nullable()
    .typeError('Publication Year must be a number')
    .positive('Publication Year must be a positive number')
    .integer('Publication Year must be an integer')
    .required('Publication Year is required'),
  authorIds: yup.array()
    .of(yup.string().required('Each author must be selected'))
    .min(1, 'At least one author is required')
    .required('At least one author is required'),
});

interface BookFormProps {
  onSubmit: (data: FormData) => void;
  defaultValues?: FormData;
  authors: Author[];
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, defaultValues, authors }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isDirty },
  } = useForm<FormData>({
    defaultValues: defaultValues || {
      title: '',
      publicationYear: null,
      authorIds: [],
    },
    resolver: yupResolver(schema) as Resolver<FormData>,
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
  });

  const handleFormSubmit: SubmitHandler<FormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <FormControl fullWidth margin="normal">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                error={!!(errors.title && touchedFields.title)}
                helperText={errors.title?.message as string}
              />
            )}
          />
        </FormControl>
      </div>

      <div>
        <FormControl fullWidth margin="normal">
          <Controller
            name="publicationYear"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Publication Year"
                error={!!(errors.publicationYear && touchedFields.publicationYear)}
                helperText={errors.publicationYear?.message as string}
                InputProps={{
                  inputProps: {
                    step: 1,
                    min: 0,
                  },
                }}
              />
            )}
          />
        </FormControl>
      </div>

      <div>
        <FormControl fullWidth margin="normal">
          <Controller
            name="authorIds"
            control={control}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={authors}
                getOptionLabel={(option) => option.fullName}
                value={authors.filter(author => field.value.includes(author.id))}
                onChange={(_, value) => field.onChange(value.map((author: Author) => author.id))}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Authors"
                    error={!!(errors.authorIds && touchedFields.authorIds)}
                    helperText={errors.authorIds?.message as string}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {authors.length === 0 && (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
                            </InputAdornment>
                          )}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
                noOptionsText={authors.length === 0 ? 'No authors available' : 'No options'}
              />
            )}
          />
          {errors.authorIds && <FormHelperText error>{errors.authorIds?.message as string}</FormHelperText>}
        </FormControl>
      </div>

      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={!isDirty || !isValid} // Disable button if form is not dirty or valid
      >
        Save
      </Button>
      <CancelButton />

    </form>
  );
};

export default BookForm;

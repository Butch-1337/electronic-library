import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, FormControl } from '@mui/material';
import CancelButton from './CancelButton'

interface AuthorFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
});

const AuthorForm: React.FC<AuthorFormProps> = ({ onSubmit, defaultValues }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isDirty }
  } = useForm({
    defaultValues: {
      fullName: defaultValues?.fullName || '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur', // Trigger validation on blur
    shouldFocusError: true, // Focus on first error field
    reValidateMode: 'onChange', // Revalidate on change
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl fullWidth margin="normal">
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Full Name"
              error={!!(errors.fullName && touchedFields.fullName)}
              helperText={errors.fullName?.message as string}
            />
          )}
        />
      </FormControl>

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

export default AuthorForm;

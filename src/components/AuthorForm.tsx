import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, FormControl } from '@mui/material';

interface AuthorFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
});

const AuthorForm: React.FC<AuthorFormProps> = ({ onSubmit, defaultValues }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: defaultValues?.fullName || '',
    },
    resolver: yupResolver(schema),
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
              error={!!errors.fullName}
              helperText={errors.fullName?.message as string}
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

export default AuthorForm;

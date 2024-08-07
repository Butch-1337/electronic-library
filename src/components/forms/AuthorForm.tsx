import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, FormControl, Box } from '@mui/material';
import CancelButton from '../CancelButton';

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
    mode: 'onBlur',
    shouldFocusError: true,
    reValidateMode: 'onChange',
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

      <Box sx={{ marginTop: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!isDirty || !isValid}
          sx={{ marginRight: '16px' }}
        >
          Save
        </Button>
        <CancelButton />
      </Box>
    </form>
  );
};

export default AuthorForm;

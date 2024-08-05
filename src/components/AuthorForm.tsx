import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface AuthorFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

const schema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
});

const AuthorForm: React.FC<AuthorFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Full Name</label>
        <input {...register("fullName")} />
        <p>{errors.fullName?.message  as any}</p>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default AuthorForm;

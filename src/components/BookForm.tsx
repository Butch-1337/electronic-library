import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface BookFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: any;
  authors: { id: string, fullName: string }[];
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  publicationYear: yup.number().required("Publication Year is required"),
  authorIds: yup.array().of(yup.number()).min(1, "At least one author is required"),
});

const BookForm: React.FC<BookFormProps> = ({ onSubmit, defaultValues, authors }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Title</label>
        <input {...register("title")} />
        <p>{errors.title?.message as any}</p>
      </div>
      <div>
        <label>Publication Year</label>
        <input type="number" {...register("publicationYear")} />
        <p>{errors.publicationYear?.message as any}</p>
      </div>
      <div>
        <label>Authors</label>
        <select multiple {...register("authorIds")}>
          {authors.map(author => (
            <option key={author.id} value={author.id}>{author.fullName}</option>
          ))}
        </select>
        <p>{errors.authorIds?.message as any}</p>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;

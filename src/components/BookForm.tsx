import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Author } from '../hooks/useAuthors';

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
      <div>
        <label>Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.title && <p>{errors.title?.message as string}</p>}
      </div>

      <div>
        <label>Publication Year</label>
        <Controller
          name="publicationYear"
          control={control}
          render={({ field }) => <input {...field} />}
        />
        {errors.publicationYear && <p>{errors.publicationYear?.message as string}</p>}
      </div>

      <div>
        <label>Authors</label>
        <Controller
          name="authorIds"
          control={control}
          render={({ field }) => (
            <select
              multiple
              {...field}
              value={field.value || []}
              onChange={(e) => {
                const options = e.target.options;
                const value: string[] = [];
                for (let i = 0; i < options.length; i++) {
                  if (options[i].selected) {
                    value.push(options[i].value);
                  }
                }
                field.onChange(value);
              }}
            >
              {authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.fullName}
                </option>
              ))}
            </select>
          )}
        />
        {errors.authorIds && <p>{errors.authorIds?.message as string}</p>}
      </div>

      <button type="submit">Save</button>
    </form>
  );
};

export default BookForm;

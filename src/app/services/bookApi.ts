import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IBook } from '../../utils/types/book.type';

export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bookshelf-api-production-b818.up.railway.app/api/books',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Books'],
  endpoints: (builder) => ({

    getBooks: builder.query<IBook[], void>({
      query: () => '/get',
      providesTags: ['Books'],
    }),
    
    createBook: builder.mutation<IBook, FormData>({
      query: (formData) => ({
        url: '/add',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Books'],
    }),
   
    updateBook: builder.mutation<IBook, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Books'],
    }),

    deleteBook: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useLazyGetBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

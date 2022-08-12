import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { Response } from '../../models/models';

export const dictionaryApi = createApi({
  reducerPath: 'dictionary/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.dictionaryapi.dev/api/v2/',
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    searchWord: builder.query<Response[], string>({
      query: (word: string) => `entries/en/${word}`,
    }),
  }),
});

export const { useSearchWordQuery } = dictionaryApi;
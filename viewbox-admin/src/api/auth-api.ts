import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAuthResponseDto } from '../core/types/auth.response.dto';

export const api0 = createApi({
  reducerPath: 'api0',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/auth',
    // credentials: 'include'
  }),
  tagTypes: ['auth'],
  endpoints: () => ({}),
});

export const authApi = api0.injectEndpoints({
  endpoints: (builder) => ({
    getAuth: builder.query<TAuthResponseDto, any>({
      query: () => ({
        url: '/login',
        method: 'get'
      }),
    }),
  }),
  overrideExisting: false
});

export const {
  useGetAuthQuery
} = authApi;
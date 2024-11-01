import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Api } from '../core/enums/api.enum';
import { getEnumNames } from '../utils/func';
import { RootState } from '../store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token) headers.set('authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: getEnumNames(Api),
  endpoints: () => ({}),
})

export const queryTags = (type: string, result: { id: any }[]) => {
  return (result.map(({ id }) => ({
    type: type,
    id: id
  })))
}
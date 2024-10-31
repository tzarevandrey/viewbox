import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Api } from '../core/enums/api.enum';
import { getEnumNames } from '../utils/func';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include'
  }),
  tagTypes: getEnumNames(Api),
  endpoints: () => ({}),
})

export const queryTags = (type, result) => {
  result?.map(({ id }) => ({
    type: type,
    id: id
  }))
}
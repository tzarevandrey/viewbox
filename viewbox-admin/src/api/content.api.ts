import { TContentGetDto } from '../components/pages/contents/dto/content.get.dto';
import { Api } from "../core/enums/api.enum";
import { TContent } from '../core/types/content';
import { snack } from '../utils/snackbar';
import { api } from "./api";

export const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContent: builder.query<TContent[], any>({
      query: () => ({
        url: '/content',
        method: 'get'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении контента');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Contents}`, id: 'list' }] : []
    }),
    getContent: builder.query<TContentGetDto, number>({
      query: (id) => ({
        url: `/content/${id}`,
        method: 'get',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении контента');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Contents}`, id: result.id }] : []
    }),
    addContent: builder.mutation<TContent, FormData>({
      query: (body) => {
        return {
          url: '/content',
          method: 'post',
          body,
          formData: true
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Контент добавлен')
        } catch (error) {
          snack.error('Ошибка при добавлении контента');
        }
      },
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Contents}`, id: 'list' }, { type: `${Api.Journal}` }]
    }),
    deleteContent: builder.mutation<any, number>({
      query: (id) => ({
        url: `/content/${id}`,
        method: 'delete'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Контент удален')
        } catch (error) {
          snack.error('Ошибка при удалении контента');
        }
      },
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Contents}`, id: 'list' }, { type: `${Api.Journal}` }]
    }),
    updateContent: builder.mutation<TContent, TContent>({
      query: (body) => ({
        url: '/content',
        method: 'put',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Контент изменён')
        } catch (error) {
          snack.error('Ошибка при изменении контента');
        }
      },
      invalidatesTags: (result) => result ? [{ type: `${Api.Contents}`, id: 'list' }, { type: `${Api.Contents}`, id: result.id }, { type: `${Api.Journal}` }] : []
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllContentQuery,
  useAddContentMutation,
  useGetContentQuery,
  useDeleteContentMutation,
  useUpdateContentMutation
} = contentApi;
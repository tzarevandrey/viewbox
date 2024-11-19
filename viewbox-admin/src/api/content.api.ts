import { TEditContentDto } from '../components/pages/contents/dto/edit.content.dto';
import { TGetContentDto } from "../components/pages/contents/dto/get.content.dto";
import { Api } from "../core/enums/api.enum";
import { TContent } from '../core/types/content';
import { snack } from '../utils/snackbar';
import { api } from "./api";

export const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContent: builder.query<TGetContentDto[], any>({
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
    getContent: builder.query<TContent, number>({
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
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Contents}`, id: 'list' }]
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
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Contents}`, id: 'list' }]
    }),
    updateContent: builder.mutation<TContent, TEditContentDto>({
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
      invalidatesTags: (result) => result ? [{ type: `${Api.Contents}`, id: 'list' }, { type: `${Api.Contents}`, id: result.id }] : []
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
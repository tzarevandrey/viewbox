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
      providesTags: (result) => result ? [{ type: `${Api.Contents}`, id: 'list' }] : []
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
      invalidatesTags: (result, error) => error ? [] : [{ type: `${Api.Contents}`, id: 'list' }]
    }),

  }),
  overrideExisting: false
})

export const {
  useGetAllContentQuery,
  useAddContentMutation,
} = contentApi;
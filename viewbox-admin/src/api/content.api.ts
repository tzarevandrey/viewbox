import { TCreateContentDto } from '../components/pages/contents/dto/create.content.dto';
import { TGetContentDto } from "../components/pages/contents/dto/get.content.dto";
import { Api } from "../core/enums/api.enum";
import { TContent } from '../core/types/content';
import { api, queryTags } from "./api";

export const contentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllContent: builder.query<TGetContentDto[], any>({
      query: () => ({
        url: '/content',
        method: 'get'
      }),
      providesTags: (result) => result ? queryTags(`${Api.Contents}`, result) : []
    }),
    addContent: builder.mutation<TContent, TCreateContentDto>({
      query: (body) => ({
        url: '/content',
        method: 'post',
        body,
        formData: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "*/*"
        }
      }),
      invalidatesTags: (result, error) => error ? [] : [`${Api.Contents}`]
    }),

  }),
  overrideExisting: false
})

export const {
  useGetAllContentQuery,
  useAddContentMutation,
} = contentApi;
import { TGetContentDto } from "../components/pages/contents/dto/get.content.dto";
import { Api } from "../core/enums/api.enum";
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
    addContent: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'post',
        body
      }),
      invalidatesTags: (result, error) => error ? [] : [`${Api.Contents}`]
    }),

  }),
  overrideExisting: false
})

export const {
  useGetAllContentQuery,
} = contentApi;
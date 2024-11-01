import { TGetViewpointDTO } from "../components/pages/viewpoints/dto/get.viewpoint.dto";
import { Api } from "../core/enums/api.enum";
import { api, queryTags } from "./api";

export const viewpointsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllViewpoints: builder.query<TGetViewpointDTO[], any>({
      query: () => ({
        url: '/viewpoints',
        method: 'get',
      }),
      providesTags: (result) => queryTags(`${Api.Viewpoints}`, result || [])
    }),

  }),
  overrideExisting: false
})

export const {
  useGetAllViewpointsQuery,
} = viewpointsApi;
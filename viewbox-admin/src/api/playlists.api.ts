import { TGetPlaylistDTO } from "../components/pages/playlists/dto/get.playlists.dto";
import { Api } from "../core/enums/api.enum";
import { api, queryTags } from "./api";

export const playlistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<TGetPlaylistDTO[], any>({
      query: () => ({
        url: '/playlists',
        method: 'get',
      }),
      providesTags: (result) => queryTags(`${Api.Playlists}`, result || [])
    }),

  }),
  overrideExisting: false
})

export const {
  useGetAllPlaylistsQuery,
} = playlistsApi;
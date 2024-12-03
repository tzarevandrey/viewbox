import { TPlaylistItem } from "../core/types/playlist-item";
import { api } from "./api";

export const viewpointApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getActualPlaylist: builder.mutation<TPlaylistItem[], number>({
      query: (id) => ({
        url: `/viewpoints/play/${id}`,
        method: 'get'
      })
    })
  }),
  overrideExisting: false
})

export const {
  useGetActualPlaylistMutation,
} = viewpointApi;
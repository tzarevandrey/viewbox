import { TPlaylistItem } from "../core/types/playlist-item";
import { api } from "./api";

export const playlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPlaylist: builder.mutation<TPlaylistItem[], number>({
      query: (id) => ({
        url: `/playlists/play/${id}`,
        method: 'get'
      })
    })
  }),
  overrideExisting: false
})

export const {
  useGetPlaylistMutation,
} = playlistApi;
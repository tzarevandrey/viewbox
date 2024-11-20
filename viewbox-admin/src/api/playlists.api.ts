import { TCreatePlaylistDto } from '../components/pages/playlists/dto/create.playlists.dto';
import { TEditPlaylistDto } from '../components/pages/playlists/dto/edit.playlists.dto';
import { TGetPlaylistDto } from "../components/pages/playlists/dto/get.playlists.dto";
import { Api } from "../core/enums/api.enum";
import { TPlaylist } from '../core/types/playlist';
import { snack } from '../utils/snackbar';
import { api } from "./api";

export const playlistsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlaylists: builder.query<TGetPlaylistDto[], any>({
      query: () => ({
        url: '/playlists',
        method: 'get',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении списков воспроизведения');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Playlists}`, id: 'list' }] : []
    }),
    getPlaylist: builder.query<TPlaylist, number>({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: 'get'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении списка воспроизведения');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Playlists}`, id: result.id }] : []
    }),
    addPlaylist: builder.mutation<TPlaylist, TCreatePlaylistDto>({
      query: (body) => ({
        url: '/playlists',
        method: 'post',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          snack.success(`Cоздан список воспроизведения «${data.name}»`);
        } catch (error) {
          snack.error('Ошибка при создании списка воспроизведения');
        }
      },
      invalidatesTags: (result) => {
        if (!result) return [];
        const res = [{ type: `${Api.Playlists}`, id: 'list' }, { type: `${Api.Playlists}`, id: result.id }];
        result.items.forEach(item => res.push({ type: `${Api.Contents}`, id: item.contentItem.id }));
        return res;
      }
    }),
    updatePlaylist: builder.mutation<TPlaylist, TEditPlaylistDto>({
      query: (body) => ({
        url: '/playlists',
        method: 'put',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          snack.success(`Изменён список воспроизведения «${data.name}»`);
        } catch (error) {
          snack.error('Ошибка при изменении списка воспроизведения');
        }
      },
      invalidatesTags: (result) => {
        if (!result) return [];
        const res = [{ type: `${Api.Playlists}`, id: 'list' }, { type: `${Api.Playlists}`, id: result.id }];
        result.items.forEach(item => res.push({ type: `${Api.Contents}`, id: item.contentItem.id }));
        result.viewpoints.forEach(viewpoint => res.push({ type: `${Api.Viewpoints}`, id: viewpoint.id }));
        return res;
      }
    }),
    deletePlaylist: builder.mutation<any, number>({
      query: (id) => ({
        url: `/playlists/${id}`,
        method: 'delete'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Список воспроизведения удалён');
        } catch (error) {
          snack.error('Ошибка при удалении списка воспроизведения');
        }
      },
      invalidatesTags: (_, error) => !error ? [{ type: `${Api.Playlists}`, id: 'list' }, `${Api.Contents}`] : []
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllPlaylistsQuery,
  useGetPlaylistQuery,
  useAddPlaylistMutation,
  useUpdatePlaylistMutation,
  useDeletePlaylistMutation
} = playlistsApi;
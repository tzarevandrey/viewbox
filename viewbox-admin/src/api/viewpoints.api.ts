import { TCreateViewpointDto } from "../components/pages/viewpoints/dto/create.viewpoint.dto";
import { TEditViewpointDto } from '../components/pages/viewpoints/dto/edit.viewpoint.dto';
import { TGetViewpointDto } from "../components/pages/viewpoints/dto/get.viewpoint.dto";
import { Api } from "../core/enums/api.enum";
import { TViewpoint } from "../core/types/viewpoint";
import { snack } from '../utils/snackbar';
import { api } from "./api";

export const viewpointsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllViewpoints: builder.query<TGetViewpointDto[], any>({
      query: () => ({
        url: '/viewpoints',
        method: 'get',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении панелей воспроизведения');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Viewpoints}`, id: 'list' }] : []
    }),
    updateViewpoint: builder.mutation<TViewpoint, TEditViewpointDto>({
      query: (body) => ({
        url: '/viewpoints',
        method: 'put',
        body: body.actual
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          snack.success(`Изменена панель воспроизведения «${data.name}»`);
          const res = new Set<number>();
          if (arg.oldPlaylistId) res.add(arg.oldPlaylistId);
          if (arg.actual.playlistId) res.add(arg.actual.playlistId);
          if (res.size > 0) api.util.invalidateTags(Array.from(res).map(x => ({ type: `${Api.Playlists}`, id: x })));
        } catch (error) {
          snack.error(`Ошибка при изменении панели воспроизведения «${arg.actual.name}»`);
        }
      },
      invalidatesTags: (result) => {
        if (!result) return [];
        const res = [{ type: `${Api.Viewpoints}`, id: 'list' }, { type: `${Api.Viewpoints}`, id: result.id }];
        if (result.playlistId) res.push({ type: `${Api.Playlists}`, id: result.playlistId });
        return res;
      }
    }),
    addViewpoint: builder.mutation<TViewpoint, TCreateViewpointDto>({
      query: (body) => ({
        url: '/viewpoints',
        method: 'post',
        body: body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          snack.success(`Cоздана панель воспроизведения «${data.name}»`);
        } catch (error) {
          snack.error('Ошибка при создании панели воспроизведения');
        }
      },
      invalidatesTags: (result) => {
        if (!result) return [];
        const res = [{ type: `${Api.Viewpoints}`, id: 'list' }, { type: `${Api.Viewpoints}`, id: result.id }];
        if (result.playlistId) res.push({ type: `${Api.Playlists}`, id: result.playlistId });
        return res;
      }
    }),
    getViewpoint: builder.query<TViewpoint, number>({
      query: (id) => ({
        url: `/viewpoints/${id}`,
        method: 'get'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении панели воспроизведения');
        }
      },
      providesTags: (result, error) => error ? [] : [{ type: `${Api.Viewpoints}`, id: result?.id }]
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllViewpointsQuery,
  useAddViewpointMutation,
  useGetViewpointQuery,
  useUpdateViewpointMutation
} = viewpointsApi;
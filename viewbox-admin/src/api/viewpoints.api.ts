import { Api } from "../core/enums/api.enum";
import { TViewpoint } from '../core/types/viewpoint';
import { snack } from '../utils/snackbar';
import { api } from "./api";

export const viewpointsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllViewpoints: builder.query<TViewpoint[], any>({
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
      providesTags: (result) => result ? [{ type: `${Api.Viewpoints}`, id: result.id }] : []
    }),
    addViewpoint: builder.mutation<TViewpoint, TViewpoint>({
      query: (body) => ({
        url: '/viewpoints',
        method: 'post',
        body
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
        const res = [{ type: `${Api.Viewpoints}`, id: 'list' }, { type: `${Api.Viewpoints}`, id: result.id }, { type: `${Api.Journal}` }];
        result.items?.forEach(item => res.push({ type: `${Api.Playlists}`, id: item.playlist?.id }));
        return res;
      }
    }),
    updateViewpoint: builder.mutation<TViewpoint, TViewpoint>({
      query: (body) => ({
        url: '/viewpoints',
        method: 'put',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          snack.success(`Изменёна панель воспроизведения «${data.name}»`);
        } catch (error) {
          snack.error('Ошибка при изменении панели воспроизведения');
        }
      },
      invalidatesTags: (result) => {
        if (!result) return [];
        const res = [{ type: `${Api.Viewpoints}`, id: 'list' }, { type: `${Api.Viewpoints}`, id: result.id }, { type: `${Api.Journal}` }];
        result.items?.forEach(item => res.push({ type: `${Api.Playlists}`, id: item.playlist?.id }));
        return res;
      }
    }),
    deleteViewpoint: builder.mutation<any, number>({
      query: (id) => ({
        url: `/viewpoints/${id}`,
        method: 'delete'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Панель воспроизведения удалена');
        } catch (error) {
          snack.error('Ошибка при удалении панели воспроизведения');
        }
      },
      invalidatesTags: (_, error) => !error ? [{ type: `${Api.Viewpoints}`, id: 'list' }, { type: `${Api.Playlists}` }, { type: `${Api.Journal}` }] : []
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllViewpointsQuery,
  useGetViewpointQuery,
  useAddViewpointMutation,
  useUpdateViewpointMutation,
  useDeleteViewpointMutation
} = viewpointsApi;
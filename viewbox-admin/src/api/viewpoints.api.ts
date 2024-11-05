import { TCreateViewpointDto } from "../components/pages/viewpoints/dto/create.viewpoint.dto";
import { TGetViewpointDto } from "../components/pages/viewpoints/dto/get.viewpoint.dto";
import { Api } from "../core/enums/api.enum";
import { TViewpoint } from "../core/types/viewpoint";
import { snack } from '../utils/snackbar';
import { api, queryTags } from "./api";

export const viewpointsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllViewpoints: builder.query<TGetViewpointDto[], any>({
      query: () => ({
        url: '/viewpoints',
        method: 'get',
      }),
      providesTags: (result) => queryTags(`${Api.Viewpoints}`, result || [])
    }),
    addViewpoint: builder.mutation<TViewpoint, TCreateViewpointDto>({
      query: (body) => ({
        url: '/viewpoints',
        method: 'post',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        //on-start side-effects
        //anything to run when the query start
        try {
          const { data } = await queryFulfilled;
          snack.success(`Cоздана панель воспроизведения «${data.name}»`);
        } catch (error) {
          snack.error('Ошибка при создании панели воспроизведения');
        }
      },
      invalidatesTags: (result, error) => error ? [] : [`${Api.Viewpoints}`, `${Api.Playlists}`]
    }),
    getViewpoint: builder.query<TViewpoint, number>({
      query: (id) => ({
        url: `/viewpoints/${id}`,
        method: 'get'
      }),
      providesTags: (result, error) => error ? [] : [{ type: `${Api.Viewpoints}`, id: result?.id }]
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllViewpointsQuery,
  useAddViewpointMutation,
  useGetViewpointQuery
} = viewpointsApi;
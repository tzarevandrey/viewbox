// import { enqueueSnackbar } from "notistack";
import { TCreateViewpointDTO } from "../components/pages/viewpoints/dto/create.viewpoint.dto";
import { TGetViewpointDto } from "../components/pages/viewpoints/dto/get.viewpoint.dto";
import { Api } from "../core/enums/api.enum";
import { TViewpoint } from "../core/types/viewpoint";
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
    addVewpoint: builder.mutation<TViewpoint, TCreateViewpointDTO>({
      query: (body) => ({
        url: '/viewpoints',
        method: 'post',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        //on-start side-effects
        //anything to run when the query start
        try {
          //onSuccess side-effects          
          const { data } = await queryFulfilled;
          // enqueueSnackbar(`Cоздана панель воспроизведения «${data.name}»`, {
          //   anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          //   variant: 'success'
          // })
        } catch (error) {
          //onError side-effects
          // enqueueSnackbar('Ошибка при создании панели воспроизведения', {
          //   anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
          //   variant: 'error'
          // })
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
  useAddVewpointMutation,
  useGetViewpointQuery
} = viewpointsApi;
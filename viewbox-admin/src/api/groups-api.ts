import { Api } from '../core/enums/api.enum';
import { TGroup } from '../core/types/groups';
import { snack } from '../utils/snackbar';
import { api } from './api';

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query<TGroup[], any>({
      query: () => ({
        url: '/groups',
        method: 'get'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении групп доступа');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Groups}`, id: 'list' }] : []
    }),
    getGroup: builder.query<TGroup, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'get',
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении группы');
        }
      },
      providesTags: (result) => result ? [{ type: `${Api.Groups}`, id: result.id }] : []
    }),
    addGroup: builder.mutation<TGroup, TGroup>({
      query: (body) => {
        return {
          url: '/groups',
          method: 'post',
          body
        }
      },
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Группа добавлена')
        } catch (error) {
          snack.error('Ошибка при добавлении группы');
        }
      },
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Groups}`, id: 'list' }, { type: `${Api.Journal}` }]
    }),
    deleteGroup: builder.mutation<any, number>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'delete'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Группа удалена')
        } catch (error) {
          snack.error('Ошибка при удалении группы');
        }
      },
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Groups}`, id: 'list' }, { type: `${Api.Journal}` }]
    }),
    updateGroup: builder.mutation<TGroup, TGroup>({
      query: (body) => ({
        url: '/groups',
        method: 'put',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          snack.success('Группа изменена')
        } catch (error) {
          snack.error('Ошибка при изменении группы');
        }
      },
      invalidatesTags: (result) => result ? [{ type: `${Api.Groups}`, id: 'list' }, { type: `${Api.Groups}`, id: result.id }, { type: `${Api.Journal}` }] : []
    })
  }),
  overrideExisting: false
})

export const {
  useGetAllGroupsQuery,
  useAddGroupMutation,
  useGetGroupQuery,
  useDeleteGroupMutation,
  useUpdateGroupMutation
} = groupsApi;
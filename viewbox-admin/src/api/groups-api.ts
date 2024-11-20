import { TCreateGroupDto } from '../components/pages/groups/dto/create.groups.dto';
import { TEditGroupDto } from '../components/pages/groups/dto/edit.groups.dto';
import { TGetGroupDto } from '../components/pages/groups/dto/get.groups.dto';
import { Api } from '../core/enums/api.enum';
import { TGroup } from '../core/types/groups';
import { snack } from '../utils/snackbar';
import { api } from './api';

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllGroups: builder.query<TGetGroupDto[], any>({
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
    addGroup: builder.mutation<TGroup, TCreateGroupDto>({
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
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Groups}`, id: 'list' }]
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
      invalidatesTags: (_, error) => error ? [] : [{ type: `${Api.Groups}`, id: 'list' }]
    }),
    updateGroup: builder.mutation<TGroup, TEditGroupDto>({
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
      invalidatesTags: (result) => result ? [{ type: `${Api.Groups}`, id: 'list' }, { type: `${Api.Groups}`, id: result.id }] : []
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
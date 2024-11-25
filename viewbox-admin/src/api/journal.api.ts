import { TGetJournalDto } from '../components/pages/journal/dto/get.journal.dto';
import { Api } from '../core/enums/api.enum';
import { TJournalWithCount } from '../core/types/journal';
import { TJournalDetails } from '../core/types/journal-details';
import { snack } from '../utils/snackbar';
import { api, queryTags } from './api';

export const journalApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPage: builder.query<TJournalWithCount, TGetJournalDto>({
      query: (body) => ({
        url: '/journal',
        method: 'post',
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении журнала событий');
        }
      },
      providesTags: (result) => result ? queryTags(`${Api.Journal}`, result.data) : []
    }),
    getDetails: builder.query<TJournalDetails[], number>({
      query: (id) => ({
        url: `/journal/${id}`,
        method: 'get'
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          snack.error('Ошибка при получении деталей события');
        }
      },
      providesTags: (result, _, arg) => result ? [{ type: `${Api.JournalDetails}`, id: arg }] : []
    })
  })
})

export const {
  useGetPageQuery,
  useGetDetailsQuery
} = journalApi;
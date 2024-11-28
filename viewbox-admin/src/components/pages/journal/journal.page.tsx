import { useEffect, useState } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { TGetJournalDto } from './dto/get.journal.dto';
import { useGetPageQuery } from '../../../api/journal.api';
import { Button, DatePicker, Form, Pagination, Table, TableProps } from 'antd';
import { TJournal } from '../../../core/types/journal';
import moment from 'moment';
import { EVENT_ENTITY_NAMES } from '../../../core/dictionaries/event-entities.dictionary';
import { EVENT_TYPE_NAMES } from '../../../core/dictionaries/event-types.dictionary';
import { NUMBERS } from '../../../core/constants/numbers';
import { openModal } from '../../../reducers/modal.slice';
import { JournalDetails } from './journal-details.modal';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';
import { getEventColor } from '../../../utils/func';

type TProps = {
  functionals?: Functional[];
}

export const Journal = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();

  const dateFormat = 'DD.MM.YYYY HH:mm';

  const dateFormatToRangePicker = 'DD.MM.YYYY';

  const { RangePicker } = DatePicker;

  const [filter, setFilter] = useState<TGetJournalDto>({ page: 1, size: NUMBERS.DEFAULT_TABLE_ROWS, fromDate: null, toDate: null });

  useEffect(() => {
    dispatch(setTitle('Журнал событий'));
    // eslint-disable-next-line
  }, [])

  const {
    data: journal,
    isLoading: journalLoading,
    isError: journalLoadingerror
  } = useGetPageQuery(filter);

  if (journalLoading) return <Loading />
  if (journalLoadingerror) return <Error />

  const columns: TableProps<TJournal>['columns'] = [
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (_, item) => {
        return (
          <div>{moment(item.date).format(dateFormat)}</div>
        )
      }
    },
    {
      title: 'Объект',
      dataIndex: 'eventEntity',
      key: 'eventEntity',
      render: (_, item) => {
        return (
          <div>
            <div className='journal__entity-name'>{item.entityName}</div>
            <div>{EVENT_ENTITY_NAMES[item.eventEntity]}</div>
          </div>
        )
      }
    },
    {
      title: 'Событие',
      dataIndex: 'eventType',
      key: 'eventType',
      render: (_, item) => {
        return (
          <div>{EVENT_TYPE_NAMES[item.eventType]}</div>
        )
      }
    },
    {
      title: 'Автор',
      dataIndex: 'authorName',
      key: 'authorName',
      render: (_, item) => {
        return (
          <div>{item.authorName}</div>
        )
      }
    }
  ]

  return (
    <div className='journal__view'>
      <Form
        size='small'
        initialValues={{ 'dateRange': [filter.fromDate, filter.toDate] }}
        onFinish={(values) => { console.log(values); setFilter({ ...filter, page: 1, fromDate: values.dateRange[0], toDate: values.dateRange[1] }) }}
      >
        <div className='journal__view__filter-block'>
          <Form.Item
            label='Период'
            name='dateRange'

          >
            <RangePicker format={dateFormatToRangePicker} />

          </Form.Item>
          <Button
            type='default'
            htmlType='submit'
          >
            Выбрать
          </Button>
        </div>
      </Form>
      <Table<TJournal>
        bordered
        columns={columns}
        dataSource={[...(journal?.data ?? [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
        rowHoverable
        rowKey={item => item.id}
        pagination={false}
        size='small'
        onRow={(rowItem) => {
          const color = getEventColor(rowItem.eventType)
          return {
            style: { cursor: 'pointer', color },
            onClick: () => { dispatch(openModal(() => <JournalDetails journal={rowItem} color={color} />)) }
          }
        }}
      />
      <div className='journal__view__pagination-block'>
        <Pagination
          size='small'
          defaultPageSize={filter.page}
          total={journal ? Math.ceil(journal.total / NUMBERS.DEFAULT_TABLE_ROWS) : 1}
          onChange={(e) => { setFilter({ ...filter, page: e }) }}
        />
      </div>
    </div>
  )
}
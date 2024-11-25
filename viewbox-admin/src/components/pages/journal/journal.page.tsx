import { Fragment, useEffect, useState } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { TGetJournalDto } from './dto/get.journal.dto';
import { useGetPageQuery } from '../../../api/journal.api';
import { JournalLoadingPage } from './journal.loading.page';
import { JournalErrorPage } from './journal.error.page';
import { Button, DatePicker, Form, Pagination, Table, TableProps } from 'antd';
import { TJournal } from '../../../core/types/journal';
import moment from 'moment';
import { EVENT_ENTITY_NAMES } from '../../../core/dictionaries/event-entities.dictionary';
import { EVENT_TYPE_NAMES } from '../../../core/dictionaries/event-types.dictionary';
import { NUMBERS } from '../../../core/constants/numbers';

type TProps = {
  functionals?: Functional[];
}

export const Journal = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();

  const dateFormat = 'DD-MM-YYYY HH:mm';

  const dateFormatToRangePicker = 'DD-MM-YYYY';

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

  if (journalLoading) return <JournalLoadingPage />
  if (journalLoadingerror) return <JournalErrorPage />

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
            <div>{item.entityName}</div>
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
    <Fragment>
      <Form
        initialValues={{ 'dateRange': [filter.fromDate, filter.toDate] }}
        layout='vertical'
        onFinish={(values) => { setFilter({ ...filter, page: 1, fromDate: values.dateRange[0], toDate: values.dateRange[1] }) }}
      >
        <Form.Item
          label='Период'
          name='dateRange'
        >
          <RangePicker format={dateFormatToRangePicker} />
          <Button
            type='primary'
            htmlType='submit'
          >
            Выбрать
          </Button>
        </Form.Item>
      </Form>
      <Table<TJournal>
        columns={columns}
        dataSource={[...(journal?.data ?? [])].sort((a, b) => b.date.getTime() - a.date.getTime())}
        rowHoverable
        rowKey={item => item.id}
        pagination={false}
      />
      <Pagination
        defaultPageSize={filter.page}
        total={10}
        onChange={(e) => { setFilter({ ...filter, page: e }) }}
      />
    </Fragment>
  )
}
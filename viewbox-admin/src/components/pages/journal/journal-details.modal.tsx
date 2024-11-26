import moment from 'moment';
import { useGetDetailsQuery } from '../../../api/journal.api';
import { TJournal } from '../../../core/types/journal';
import { useAppDispatch } from '../../../hooks';
import { EVENT_ENTITY_NAMES } from '../../../core/dictionaries/event-entities.dictionary';
import { EVENT_TYPE_NAMES } from '../../../core/dictionaries/event-types.dictionary';
import { Button, Table, TableProps } from 'antd';
import { TJournalDetails } from '../../../core/types/journal-details';
import { ENTITY_FIELDS_NAMES } from '../../../core/dictionaries/entity-fields.dictionary';
import { JournalDetailsError } from './journal-details.error.page';
import { closeModal } from '../../../reducers/modal.slice';

type TProps = {
  journal: TJournal;
  color: string;
}

export const JournalDetails = ({ journal, color }: TProps) => {

  const dispatch = useAppDispatch();

  const {
    data: details,
    isLoading: detailsLoading,
    isError: detailsLoadingError
  } = useGetDetailsQuery(journal.id)

  const columns: TableProps<TJournalDetails>['columns'] = [
    {
      title: 'Поле',
      dataIndex: 'entityField',
      key: 'entityField',
      render: (_, item) => {
        return (
          <div>{ENTITY_FIELDS_NAMES[item.entityField]}</div>
        )
      }
    },
    {
      title: 'Предыдущее значение',
      dataIndex: 'prevValue',
      key: 'prevValue',
      render: (_, item) => {
        return (
          <div>{item.prevValue}</div>
        )
      }
    },
    {
      title: 'Новое значение',
      dataIndex: 'actualValue',
      key: 'actualValue',
      render: (_, item) => {
        return (
          <div>{item.actualValue}</div>
        )
      }
    }
  ]

  if (detailsLoadingError) return <JournalDetailsError />

  return (
    <div className='journal-details'>
      <div className='journal-details__header'>Детали события</div>
      <hr />
      <div className='journal-details__main'>
        <div className='journal-detail__main__label'>Дата:</div>
        <div className='journal-detail__main__value'>{moment(journal.date).format('DD.MM.YYYY HH:mm')}</div>
        <div className='journal-detail__main__label'>Объект:</div>
        <div className='journal-detail__main__value'>
          <div>{journal.entityName}</div>
          <div className='journal-detail__main__value__default'>{EVENT_ENTITY_NAMES[journal.eventEntity]}</div>
        </div>
        <div className='journal-detail__main__label'>Событие:</div>
        <div className='journal-detail__main__value' style={{ color }}>{EVENT_TYPE_NAMES[journal.eventType]}</div>
        <div className='journal-detail__main__label'>Автор:</div>
        <div className='journal-detail__main__value'>{journal.authorName}</div>
      </div>
      <Table<TJournalDetails>
        size='small'
        columns={columns}
        rowKey={item => item.entityField}
        dataSource={details}
        loading={detailsLoading}
      />
      <div>
        <Button type='default' onClick={() => dispatch(closeModal())}>Назад</Button>
      </div>
    </div>
  )
}
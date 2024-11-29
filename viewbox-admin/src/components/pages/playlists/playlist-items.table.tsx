import { Table, TableProps } from 'antd';
import { TPlaylistItem } from '../../../core/types/playlist-item'
import { Functional } from '../../../core/enums/functional.enum';
import { Page } from '../../../core/enums/pages.enum';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getContentColor, getContentName, getPageLink } from '../../../utils/func';

type TProps = {
  items: TPlaylistItem[];
  functionals?: Functional[];
}

type TTableData = {
  contentItemId: number;
  contentItemName: string;
  color: string;
  extClassName: string;
  duration: number | null;
  startDate: Date | null;
  expireDate: Date | null;
  position: number;
}

export const PlaylistItemsTable = ({ items, functionals }: TProps) => {

  const navigate = useNavigate();

  const tableItems: TTableData[] = [...items].sort((a, b) => a.position - b.position).map(item => {
    const contentItemName = getContentName(item.contentItem);
    const color = getContentColor(item.contentItem);
    const currentDate = new Date();
    let extClassName = '';
    if (item.expireDate !== null && new Date(item.expireDate).getTime() < currentDate.getTime()) {
      extClassName = 'playlist__view__value_expired'
    } else if (item.startDate !== null && new Date(item.startDate).getTime() < currentDate.getTime()) {
      extClassName = 'playlist__view__value_planned'
    }
    return {
      contentItemId: item.contentItem.id ?? 0,
      contentItemName,
      color,
      extClassName,
      duration: item.duration,
      startDate: item.startDate,
      expireDate: item.expireDate,
      position: item.position
    }
  })

  const columns: TableProps<TTableData>['columns'] = [
    {
      title: '',
      dataIndex: 'contentType',
      key: 'contentType',
      render: (_, item) => <div className='playlist-item__content-marker' style={{ borderColor: item.color }}></div>
    },
    {
      title: 'Имя',
      dataIndex: 'contentItemName',
      key: 'contentItemName',
      render: (_, item) =>
        <div
          className={`playlist__view__table__value playlist-row ${item.extClassName}`}
          style={{ borderColor: item.color }}
          title={item.contentItemName}
        >{item.contentItemName}</div>
    },
    {
      title: 'Период использования',

      children: [
        {
          title: 'Начало',
          dataIndex: 'startDate',
          key: 'startDate',
          render: (_, item) =>
            <div
              className={`playlist__view__table__value playlist-row ${item.extClassName}`}
              style={{ borderColor: item.color }}
            >
              {item.startDate
                ? moment(item.startDate).format('DD.MM.YYYY HH:mm')
                : ''
              }
            </div>
        },
        {
          title: 'Конец',
          dataIndex: 'expireDate',
          key: 'expireDate',
          render: (_, item) =>
            <div
              className={`playlist__view__table__value playlist-row ${item.extClassName}`}
              style={{ borderColor: item.color }}
            >
              {item.expireDate
                ? moment(item.expireDate).format('DD.MM.YYYY HH:mm')
                : ''
              }
            </div>
        }
      ]
    },
    {
      title: 'Продолжительность (сек)',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, item) =>
        <div
          className={`playlist__view__table__value playlist-row ${item.extClassName}`}
          style={{ borderColor: item.color }}
        >{item.duration}</div>
    }
  ]

  return (
    <Table<TTableData>
      bordered
      size='small'
      columns={columns}
      dataSource={tableItems}
      rowHoverable
      rowKey={(item) => `${item.position}`}
      onRow={item => {
        if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
        return {
          onClick: () => {
            const link = getPageLink(Page.Contents, Functional.Read);
            if (link) navigate(link.replace(':id', `${item.contentItemId}`));
          },
          style: { cursor: 'pointer' }
        }
      }}
    />
  )
}

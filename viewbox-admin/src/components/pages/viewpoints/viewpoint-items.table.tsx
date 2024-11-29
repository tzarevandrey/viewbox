import { Table, TableProps } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { Page } from '../../../core/enums/pages.enum';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { TViewpointItem } from '../../../core/types/viewpoint-item';
import { CheckOutlined } from '@ant-design/icons';
import { getPageLink, getPlaylistStyle } from '../../../utils/func';

type TProps = {
  items: TViewpointItem[];
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

export const ViewpointItemsTable = ({ items, functionals }: TProps) => {

  const navigate = useNavigate();

  const tableItems: TViewpointItem[] = [...items].sort((a, b) => {
    if (a.startDate === null) return -1;
    if (b.startDate === null) return 1;
    const aDate = new Date(a.startDate).getTime();
    const bDate = new Date(b.startDate).getTime();
    return bDate - aDate;
  })

  const columns: TableProps<TViewpointItem>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'playlist',
      key: 'playlist',
      render: (_, item) =>
        <div
          className={'viewpoint__view__table__value viewpoint-row'}
          title={item.playlist?.name}
        >{item.playlist?.name}</div>
    },
    {
      title: 'Период воспроизведения',

      children: [
        {
          title: 'Начало',
          dataIndex: 'startDate',
          key: 'startDate',
          render: (_, item) =>
            <div
              className={'viewpoint__view__table__value viewpoint-row'}
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
              className={'viewpoint__view__table__value viewpoint-row'}
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
      title: 'По умолчанию',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (_, item) => {
        if (item.isDefault) {
          return (
            <div className='viewpoint__view__table__value viewpoint-row default-playlist-marker'>
              <CheckOutlined />
            </div>
          )
        } else return null;
      }
    }
  ]

  return (
    <Table<TViewpointItem>
      bordered
      size='small'
      columns={columns}
      dataSource={tableItems}
      rowHoverable
      rowKey={item => item.id ?? 0}
      onRow={item => {
        const currentStyle = getPlaylistStyle(item, items.filter(x => x.id !== item.id));
        if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return { style: currentStyle };
        return {
          onClick: () => {
            const link = getPageLink(Page.Playlists, Functional.Read);
            if (link) navigate(link.replace(':id', `${item.playlist?.id}`));
          },
          style: { ...currentStyle, cursor: 'pointer' }
        }
      }}
    />
  )
}

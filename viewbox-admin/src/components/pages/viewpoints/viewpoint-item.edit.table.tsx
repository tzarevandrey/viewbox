import { useAppDispatch } from '../../../hooks';
import { Button, Checkbox, DatePicker, Select, Table, TableProps } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { closeModal, openModal } from '../../../reducers/modal.slice';
import moment from 'moment';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';
import { TViewpointItem } from '../../../core/types/viewpoint-item';
import { addViewpointItem, removeViewpointItem, setDefaultPlaylist, updateViewpointItem } from '../../../reducers/viewpoint.slice';
import { ViewpointItemAddModal } from './viewpoint-item.add.modal';
import { getPlaylistStyle } from '../../../utils/func';

type TProps = {
  items: TViewpointItem[];
}

export const ViewpointItemEditTable = ({ items }: TProps) => {

  const tableItems = [...items].sort((a, b) => {
    if (a.isDefault) return -1;
    if (b.isDefault) return 1;
    if (a.startDate === null) return -1;
    if (b.startDate === null) return 1;
    const aDate = new Date(a.startDate).getTime();
    const bDate = new Date(b.startDate).getTime();
    return bDate - aDate;
  })

  const dispatch = useAppDispatch();

  const {
    data: playlists,
    isLoading: playlistsLoading,
    isError: playlistsLoadingError
  } = useGetAllPlaylistsQuery(null);

  const dateFormat = 'DD.MM.YYYY HH:mm';

  const columns: TableProps<TViewpointItem>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'playlist',
      key: 'playlist',
      render: (_, item) =>
        <Select
          showSearch
          className='playlist__edit__value'
          value={item.playlist?.id}
          loading={playlistsLoading}
          disabled={playlistsLoadingError}
          onChange={(e) => {
            const eItem = playlists?.find(x => x.id === e);
            if (eItem !== undefined) {
              dispatch(updateViewpointItem({
                ...item,
                playlist: eItem
              }));
            }
          }}
        >
          {[...(playlists ?? [])].sort((a, b) => {
            const aName = (a.name ?? '').toLowerCase();
            const bName = (b.name ?? '').toLowerCase();
            if (aName > bName) return 1;
            if (aName < bName) return -1;
            return 0;
          }).map(vItem => {
            return (
              <Select.Option key={vItem.id ?? 0} value={vItem.id}>
                {vItem.name}
              </Select.Option>
            )
          })}
        </Select>
    },
    {
      title: 'Период воспроизведения',
      children: [
        {
          title: 'Начало',
          dataIndex: 'startDate',
          key: 'startDate',
          render: (_, item) => {
            return (
              <DatePicker
                className='playlist__edit__value'
                format={dateFormat}
                showTime
                value={item.startDate ? moment(item.startDate) : null}
                onChange={(e) => {
                  dispatch(updateViewpointItem({ ...item, startDate: e ? e.toDate() : null }))
                }}
              />
            )
          }
        },
        {
          title: 'Конец',
          dataIndex: 'expireDate',
          key: 'expireDate',
          render: (_, item) => {
            return (
              <DatePicker
                className='playlist__edit__value middle-value'
                format={dateFormat}
                showTime
                value={item.expireDate ? moment(item.expireDate) : null}
                onChange={(e) => {
                  dispatch(updateViewpointItem({ ...item, expireDate: e ? e.toDate() : null }))
                }}
              />
            )
          }
        }
      ]
    },
    {
      title: 'По умолчанию',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (_, item) => {
        return (
          <Checkbox checked={item.isDefault} onChange={(e) => {
            if (e.target.checked) {
              dispatch(setDefaultPlaylist(item.id ?? 0));
            } else {
              dispatch(updateViewpointItem({ ...item, startDate: new Date(), expireDate: null, isDefault: false }));
            }
          }} />
        )
      }
    },
    {
      key: 'buttons',
      title: <Button icon={<PlusOutlined />} onClick={() =>
        dispatch(openModal(() => <ViewpointItemAddModal items={playlists?.filter(x => !items.map(y => y.playlist?.id).includes(x.id))} handler={(id) => {
          dispatch(closeModal());
          const item = playlists?.find(x => x.id === id);
          if (item) dispatch(addViewpointItem(item));
        }} />))} />,
      render: (_, item) => {
        return (
          <Button onClick={() => {
            dispatch(removeViewpointItem(item.id ?? 0));
          }} icon={<CloseOutlined />}></Button>
        )
      }
    }
  ]

  return (
    <Table<TViewpointItem>
      bordered
      size='small'
      columns={columns}
      rowHoverable
      dataSource={tableItems}
      rowKey={item => item.id ?? 0}
      onRow={(item) => {
        const currentStyle = getPlaylistStyle(item, items.filter(x => x.id !== item.id));
        return { style: { ...currentStyle, cursor: 'pointer' } }
      }}
    />
  )
}
import { ContentType } from '../../../core/enums/content.enum';
import { useAppDispatch } from '../../../hooks';
import { Button, DatePicker, Flex, Input, Select, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { COLORS } from '../../../core/constants/colors';
import { addItem, downItem, removeItem, upItem, updateItem } from '../../../reducers/playlist.slice';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { closeModal, openModal } from '../../../reducers/modal.slice';
import { NUMBERS } from '../../../core/constants/numbers';
import moment from 'moment';
import { TCreateViewpointItemDto } from './dto/create.viewpoints.dto';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';

type TTableData = {
  playlistId: number;
  startDate: Date | null;
  expireDate: Date | null;
  playlistName: string;
  isDefault: boolean;
}

type TProps = {
  items: TCreateViewpointItemDto[];
}

export const ViewpointItemEditTable = ({ items }: TProps) => {

  const tableItems = [...items].map(x => {
    return { ...x, playlistId: x.playlist.id, playlistName: x.playlist.name };
  });

  const dispatch = useAppDispatch();

  const {
    data: playlists,
    isLoading: playlistsLoading,
    isError: playlistsLoadingError
  } = useGetAllPlaylistsQuery(null);

  const dateFormat = 'DD.MM.YYYY HH:mm';

  const columns: TableProps<TTableData>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'playlistName',
      key: 'playlistName',
      render: (_, item) =>
        <Select
          showSearch
          className='playlist__edit__value'
          value={item.playlistId}
          loading={playlistsLoading}
          disabled={playlistsLoadingError}
          onChange={(e) => {
            const temp = playlists?.find(x => x.id === e);
            if (temp) {
              dispatch(updateItem({
                contentItemId: e,
                position: item.position,
                duration: item.contentType === ContentType.Video ? null : item.duration ?? NUMBERS.DEFAULT_DURATION,
                startDate: item.startDate,
                expireDate: item.expireDate,
                contentName: itemName,
                contentType: temp.contentType
              }));
            }
          }}
        >
          {[...(content ?? [])].sort((a, b) => a.contentType - b.contentType).map(cnt => {
            let optName = cnt.name;
            let optBorderColor = '';
            switch (cnt.contentType) {
              case ContentType.Picture: optName = cnt.imageItem?.originalName ?? optName;
                optBorderColor = COLORS.CONTENT_IMAGE;
                break;
              case ContentType.Video: optName = cnt.videoItem?.originalName ?? optName;
                optBorderColor = COLORS.CONTENT_VIDEO;
                break;
              case ContentType.WebPage: optBorderColor = COLORS.CONTENT_WEB_PAGE;
                break;
            }
            return (
              <Select.Option key={cnt.id} value={cnt.id}>
                <div className='content__select-row' title={optName}>
                  <div className='content__select-label' style={{ borderColor: optBorderColor }}></div>
                  <div className='content__select-options'>{optName}</div>
                </div>
              </Select.Option>
            )
          })}
        </Select>
    },
    {
      title: 'Период действия',
      children: [
        {
          title: 'Начало',
          dataIndex: 'startDate',
          key: 'startDate',
          render: (_, item) => {
            return (
              <DatePicker
                className='content__edit__value middle-value'
                format={dateFormat}
                showTime
                value={item.startDate ? moment(item.startDate) : null}
                onChange={(e) => {
                  dispatch(updateItem({ ...item, startDate: e ? e.toDate() : null }))
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
                className='content__edit__value middle-value'
                format={dateFormat}
                showTime
                value={item.expireDate ? moment(item.expireDate) : null}
                onChange={(e) => {
                  dispatch(updateItem({ ...item, expireDate: e ? e.toDate() : null }))
                }}
              />
            )
          }
        }
      ]
    },
    {
      title: 'Длительность',
      dataIndex: 'duration',
      key: 'duration',
      render: (_, item) => {
        return (
          <Input
            className='content__edit__value middle-value' type='number' value={item.duration ?? 0}
            disabled={item.contentType === ContentType.Video}
            onChange={(e) => {
              const val = e.target.value === '0' ? null : +e.target.value;
              dispatch(updateItem({ ...item, duration: val }));
            }}
          />
        )
      }
    },
    {
      key: 'buttons',
      title: <Button icon={<PlusOutlined />} onClick={() =>
        dispatch(openModal(() => <PlaylistItemAddModal items={content} handler={(id) => {
          dispatch(closeModal());
          const item = content?.find(x => x.id === id);
          if (item) dispatch(addItem(item));
        }} />))} />,
      render: (_, item) => {
        return (
          <Flex align='center' gap={10}>
            <Flex vertical gap={5}>
              <Button onClick={() => {
                dispatch(upItem(item.position));
              }} icon={<CaretUpOutlined />}></Button>
              <Button onClick={() => {
                dispatch(downItem(item.position));
              }} icon={<CaretDownOutlined />}></Button>
            </Flex>
            <Button onClick={() => {
              dispatch(removeItem(item.position));
            }} icon={<CloseOutlined />}></Button>
          </Flex>
        )
      }
    }
  ]

  return (
    <Table<TTableData>
      bordered
      size='small'
      columns={columns}
      rowHoverable
      dataSource={tableItems}
      rowKey={item => item.position}
    />
  )
}
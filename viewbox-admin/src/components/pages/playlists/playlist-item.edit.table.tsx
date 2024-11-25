import { TCreatePlaylistItemDto } from './dto/create.playlists.dto';
import { ContentType } from '../../../core/enums/content.enum';
import { useAppDispatch } from '../../../hooks';
import { Button, DatePicker, Flex, Input, Select, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { COLORS } from '../../../core/constants/colors';
import { addItem, downItem, removeItem, upItem, updateItem } from '../../../reducers/playlist.slice';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { closeModal, openModal } from '../../../reducers/modal.slice';
import { PlaylistItemAddModal } from './playlist-item.add.modal';
import { NUMBERS } from '../../../core/constants/numbers';

type TTableData = {
  contentItemId: number;
  position: number;
  duration: number | null;
  startDate: Date | null;
  expireDate: Date | null;
  contentName: string;
  contentType: ContentType;
  color: string;
}

type TProps = {
  items: TCreatePlaylistItemDto[];
}

export const PlaylistItemEditTable = ({ items }: TProps) => {

  const tableItems = [...items].sort((a, b) => a.position - b.position).map(x => {
    let color = '';
    switch (x.contentType) {
      case ContentType.Picture: color = COLORS.CONTENT_IMAGE;
        break;
      case ContentType.Video: color = COLORS.CONTENT_VIDEO;
        break;
      case ContentType.WebPage: color = COLORS.CONTENT_WEB_PAGE;
        break;
    }
    return { ...x, color };
  });

  const dispatch = useAppDispatch();

  const {
    data: content,
    isLoading: contentLoading,
    isError: contentLoadingError
  } = useGetAllContentQuery(null);

  const dateFormat = 'DD-MM-YYYY HH:mm';

  const columns: TableProps<TTableData>['columns'] = [
    {
      title: '',
      dataIndex: 'contentType',
      key: 'contentType',
      render: (_, item) => <div className='playlist-item__content-marker' style={{ borderColor: item.color }}></div>
    },
    {
      title: 'Имя',
      dataIndex: 'contentName',
      key: 'contentName',
      render: (_, item) =>
        <Select
          showSearch
          className='content__edit__value first-value'
          value={item.contentItemId}
          loading={contentLoading}
          disabled={contentLoadingError}
          onChange={(e) => {
            const temp = content?.find(x => x.id === e);
            if (temp) {
              let itemName = temp.name;
              switch (temp.contentType) {
                case ContentType.Picture: itemName = temp.imageItem?.originalName ?? itemName;
                  break;
                case ContentType.Video: itemName = temp.videoItem?.originalName ?? itemName;
                  break;
              }
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
                <div style={{ borderColor: optBorderColor }} className='content__select-options'>{optName}</div>
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
                value={item.startDate}
                onChange={(e) => {
                  dispatch(updateItem({ ...item, startDate: e }))
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
                value={item.expireDate}
                onChange={(e) => {
                  dispatch(updateItem({ ...item, expireDate: e }))
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
      size='small'
      columns={columns}
      rowHoverable
      dataSource={tableItems}
      rowKey={item => item.position}
    />
  )
}
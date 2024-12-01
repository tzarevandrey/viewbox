import { ContentType } from '../../../core/enums/content.enum';
import { useAppDispatch } from '../../../hooks';
import { Button, DatePicker, Flex, Input, Select, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { addItem, downItem, removeItem, upItem, updateItem } from '../../../reducers/playlist.slice';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { closeModal, openModal } from '../../../reducers/modal.slice';
import { PlaylistItemAddModal } from './playlist-item.add.modal';
import { NUMBERS } from '../../../core/constants/numbers';
import moment from 'moment';
import { TPlaylistItem } from '../../../core/types/playlist-item';
import { getContentColor, getContentName } from '../../../utils/func';

type TProps = {
  items: TPlaylistItem[];
}

export const PlaylistItemEditTable = ({ items }: TProps) => {

  const tableItems = [...items].sort((a, b) => a.position - b.position).map(x => {
    return { ...x, color: getContentColor(x.contentItem) };
  });

  const dispatch = useAppDispatch();

  const {
    data: content,
    isLoading: contentLoading,
    isError: contentLoadingError
  } = useGetAllContentQuery(null);

  const dateFormat = 'DD.MM.YYYY HH:mm';

  const columns: TableProps<TPlaylistItem>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'contentName',
      key: 'contentName',
      render: (_, item) =>
        <Select
          showSearch
          className='content__edit__value first-value content__select-row'
          value={item.contentItem.id}
          loading={contentLoading}
          disabled={contentLoadingError}

          onChange={(e) => {
            const eItem = content?.find(x => x.id === e);
            if (eItem !== undefined) {
              dispatch(updateItem({
                contentItem: eItem,
                position: item.position,
                duration: eItem.contentType === ContentType.Video ? null : item.duration ?? NUMBERS.DEFAULT_DURATION,
                startDate: item.startDate,
                expireDate: item.expireDate
              }));
            }

          }}
        >
          {[...(content ?? [])].sort((a, b) => a.contentType - b.contentType).map(cnt => {
            const optName = getContentName(cnt);
            const borderColor = getContentColor(cnt);
            return (
              <Select.Option key={cnt.id} value={cnt.id}>
                <div className='content__select-row' title={optName}>
                  <div className='content__select-label' style={{ borderColor }}></div>
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
                className='content__edit__value edit__value_date middle-value'
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
                className='content__edit__value edit__value_date middle-value'
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
            disabled={item.contentItem.contentType === ContentType.Video}
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
    <Table<TPlaylistItem>
      bordered
      size='small'
      columns={columns}
      rowHoverable
      dataSource={tableItems}
      rowKey={item => item.position}
    />
  )
}
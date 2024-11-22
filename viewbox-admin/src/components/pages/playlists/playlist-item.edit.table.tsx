import { TCreatePlaylistItemDto } from './dto/create.playlists.dto';
import { ContentType } from '../../../core/enums/content.enum';
import { useAppDispatch } from '../../../hooks';
import { Button, DatePicker, Flex, Input, Select, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { COLORS } from '../../../core/constants/colors';
import { downItem, removeItem, upItem, updateItem } from '../../../reducers/playlist.slice';
import moment from 'moment';
import { CaretDownOutlined, CaretUpOutlined, CloseOutlined } from '@ant-design/icons';

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

  const dispatch = useAppDispatch();

  const {
    data: content,
    isLoading: contentLoading,
    isError: contentLoadingError
  } = useGetAllContentQuery(null);

  const dateFormat = 'DD-MM-YYYY HH:mm';

  const columns: TableProps<TTableData>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'contentName',
      key: 'contentName',
      render: (_, item) =>
        <Select
          showSearch
          className='content__edit__value first-value'
          style={{ borderColor: item.color }}
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
                duration: null,
                startDate: null,
                expireDate: null,
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
                style={{ borderColor: item.color }}
                className='content__edit__value middle-value'
                format={dateFormat}
                defaultValue={item.startDate ? moment(item.startDate).format(dateFormat) : null}
                onChange={(e) => {
                  dispatch(updateItem({ ...item, startDate: new Date(e) }))
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
                style={{ borderColor: item.color }}
                className='content__edit__value middle-value'
                format={dateFormat}
                defaultValue={item.expireDate ? moment(item.expireDate).format(dateFormat) : null}
                onChange={(e) => {
                  dispatch(updateItem({ ...item, expireDate: new Date(e) }))
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
            style={{ borderColor: item.color }}
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
      title: <Button></Button>,
      render: (_, item) => {
        return (
          <Flex vertical>
            <Flex>
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
      dataSource={items.map(x => {
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
      })}
      rowKey={item => item.position}
    />
  )
}
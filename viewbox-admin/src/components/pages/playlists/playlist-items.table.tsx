import { Table, TableProps } from 'antd';
import { TPlaylistItem } from '../../../core/types/playlist-item'
import { ContentType } from '../../../core/enums/content.enum';
import { COLORS } from '../../../core/constants/colors';
import { Functional } from '../../../core/enums/functional.enum';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
}

export const PlaylistItemsTable = ({ items, functionals }: TProps) => {

  const navigate = useNavigate();

  const tableItems: TTableData[] = [...items].sort((a, b) => a.position - b.position).map(item => {
    let contentItemName = item.contentItem.name;
    let color = '';
    const currentDate = new Date();
    switch (item.contentItem.contentType) {
      case ContentType.Picture: color = COLORS.CONTENT_IMAGE;
        contentItemName = item.contentItem.imageItem?.originalName ?? contentItemName;
        break;
      case ContentType.Video: color = COLORS.CONTENT_VIDEO;
        contentItemName = item.contentItem.videoItem?.originalName ?? contentItemName;
        break;
      case ContentType.WebPage: color = COLORS.CONTENT_WEB_PAGE;
        break;
    }
    let extClassName = '';
    if (item.expireDate !== null && dayjs(item.expireDate).isBefore(currentDate)) {
      extClassName = 'playlist__view__value_expired'
    } else if (item.startDate !== null && dayjs(item.startDate).isAfter(currentDate)) {
      extClassName = 'playlist__view__value_planned'
    }
    return {
      contentItemId: item.contentItem.id,
      contentItemName,
      color,
      extClassName,
      duration: item.duration,
      startDate: item.startDate,
      expireDate: item.expireDate
    }
  })

  const columns: TableProps<TTableData>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'contentItemName',
      key: 'contentItemName',
      render: (_, item) =>
        <div
          className={`playlist__view__table__value playlist__table-row__first-item ${item.extClassName}`}
          style={{ borderColor: item.color }}
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
              className={`playlist__view__table__value playlist__table-row__middle-item ${item.extClassName}`}
              style={{ borderColor: item.color }}
            >
              {item.startDate
                ? dayjs(item.startDate).format('DD.MM.yyyy HH:mm')
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
              className={`playlist__view__table__value playlist__table-row__middle-item ${item.extClassName}`}
              style={{ borderColor: item.color }}
            >
              {item.expireDate
                ? dayjs(item.expireDate).format('DD.MM.yyyy HH:mm')
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
          className={`playlist__view__table__value playlist__table-row__last-item ${item.extClassName}`}
          style={{ borderColor: item.color }}
        >{item.duration}</div>
    }
  ]

  return (
    <Table<TTableData>
      columns={columns}
      dataSource={tableItems}
      rowHoverable
      rowKey={(item, i) => `${item.contentItemId}_${i}`}
      onRow={item => {
        if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
        return {
          onClick: () => {
            const link = PAGES_CONFIG[Page.Contents].subpages.find(x => x.functionals.includes(Functional.Read))?.link;
            if (link) navigate(link.replace(':id', `${item.contentItemId}`));
          }
        }
      }}
    />
  )
}

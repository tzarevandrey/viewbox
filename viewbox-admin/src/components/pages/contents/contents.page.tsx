import { Button, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { ContentErrorPage } from './content.error.page';
import { TGetContentDto } from './dto/get.content.dto';
import { ContentType } from '../../../core/enums/content.enum';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { COLORS } from '../../../core/constants/colors';
import { ContentLoadingPage } from './content.loading.page';
import dayjs from 'dayjs';

type TProps = {
  functionals?: Functional[];
}

export const Contents = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('Контент'))
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate();

  const {
    data: contents,
    isLoading: contentsLoading,
    isError: contentsLoadingError
  } = useGetAllContentQuery(null);

  const columns: TableProps<TGetContentDto>['columns'] = [
    {
      title: 'Файл/Ссылка',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => {
          let x = a.name;
          switch (a.contentType) {
            case ContentType.Picture: x = a.imageItem?.originalName || a.name;
              break;
            case ContentType.Video: x = a.videoItem?.originalName || a.name;
              break;
          }
          let y = b.name;
          switch (b.contentType) {
            case ContentType.Picture: y = b.imageItem?.originalName || b.name;
              break;
            case ContentType.Video: y = b.videoItem?.originalName || b.name;
              break;
          }
          x = x.toLowerCase();
          y = y.toLowerCase();
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        },
      },
      render: (_, content) => {
        let color = COLORS.CONTENT_WEB_PAGE;
        let name = content.name;
        switch (content.contentType) {
          case ContentType.Picture: color = COLORS.CONTENT_IMAGE;
            name = content.imageItem?.originalName ?? name;
            break;
          case ContentType.Video: color = COLORS.CONTENT_VIDEO;
            name = content.videoItem?.originalName ?? name;
            break;
        }
        return (
          <div className='content-row content-row__first-item' style={{
            borderColor: color,
          }
          }>{name}</div>
        )
      }
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      sorter: {
        compare: (a, b) => {
          const x = a.description ? a.description.toLowerCase() : '';
          const y = b.description ? b.description.toLowerCase() : '';
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        },
      },
      render: (_, content) => {
        let color = COLORS.CONTENT_WEB_PAGE;
        switch (content.contentType) {
          case ContentType.Picture: color = COLORS.CONTENT_IMAGE;
            break;
          case ContentType.Video: color = COLORS.CONTENT_VIDEO;
            break;
        }
        return (
          <div className='content-row content-row__middle-item' style={{
            borderColor: color,
          }
          }>{content.description}</div>
        )
      }
    },
    {
      title: 'Дата создания/изменения',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: {
        compare: (a, b) => (new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()),
      },
      render: (_, content) => {
        let color = COLORS.CONTENT_WEB_PAGE;
        switch (content.contentType) {
          case ContentType.Picture: color = COLORS.CONTENT_IMAGE;
            break;
          case ContentType.Video: color = COLORS.CONTENT_VIDEO;
            break;
        }
        return (
          <div className='content-row content-row__last-item' style={{
            borderColor: color,
          }
          }>{dayjs(content.lastUpdated).format('DD.MM.yyyy HH:mm')}</div>
        )
      }
    }
  ]

  if (contentsLoading) return <ContentLoadingPage />
  if (contentsLoadingError) return <ContentErrorPage />
  return (
    <Fragment>
      <div className='contents-page__subheader'>
        <div className='contents-page__subheader__buttons-block buttons-block'>
          {functionals?.includes(Functional.Create) ? (
            <Button
              onClick={() => {
                const link = PAGES_CONFIG[Page.Contents].subpages.find(x => x.functionals.includes(Functional.Create))?.link;
                if (link) navigate(link);
              }}
            >Добавить контент</Button>
          ) : null}
        </div>
        <div className='contents-page__subheader__legend-block'>
          <div style={{ borderColor: COLORS.CONTENT_WEB_PAGE }} className='legend-item'>&nbsp;-&nbsp;веб-страница</div>
          <div style={{ borderColor: COLORS.CONTENT_VIDEO }} className='legend-item'>&nbsp;-&nbsp;видео</div>
          <div style={{ borderColor: COLORS.CONTENT_IMAGE }} className='legend-item'>&nbsp;-&nbsp;изображение</div>
        </div>
      </div>
      <Table<TGetContentDto>
        columns={columns}
        dataSource={[...contents ?? []].sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())}
        rowHoverable
        rowKey={item => item.id}
        onRow={item => {
          if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
          return {
            onClick: () => {
              const link = PAGES_CONFIG[Page.Contents].subpages.find(x => x.functionals.includes(Functional.Read))?.link;
              if (link) navigate(link.replace(':id', `${item.id}`));
            }
          }
        }}
      />
    </Fragment>
  )
}
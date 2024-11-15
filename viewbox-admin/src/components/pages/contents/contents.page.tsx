import { Button, Card, Spin, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { LoadingOutlined } from '@ant-design/icons';
import { ContentErrorCard } from './content.error-card';
import { TGetContentDto } from './dto/get.content.dto';
import { ContentType } from '../../../core/enums/content.enum';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { COLORS } from '../../../core/constants/colors';

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
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
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
          <div className='content-row content-row__first-item' style={{
            borderColor: color,
          }
          }>{content.name}</div>
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
        compare: (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime(),
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
          }>{content.lastUpdated.toLocaleString()}</div>
        )
      }
    }
  ]

  if (contentsLoading) return (
    <Card>
      <Spin indicator={<LoadingOutlined spin />} />
    </Card>
  )
  if (contentsLoadingError) return (
    <ContentErrorCard />
  )
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
        dataSource={contents}
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
import { Card, Spin, Table, TableProps } from 'antd';
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

  const dt1 = new Date();
  const dt2 = new Date();
  dt2.setHours(3);
  const dt3 = new Date();
  dt3.setHours(21);
  const dt4 = new Date();
  dt4.setHours(18);
  const data: TGetContentDto[] = [
    {
      id: 1,
      contentType: ContentType.Picture,
      description: 'Красивая картинка с энергоблоками',
      name: 'hrenb.jpg',
      lastUpdated: dt1
    },
    {
      id: 2,
      contentType: ContentType.Picture,
      description: 'Ещё более красивая картинка с энергоблоками, где очень много цветов, волшебный пар из градирен, лучи солнца, розовые облака и счастливые люди, получив большую зарплату и держась за руки, идут с работы домой. А руководство машет им вслед платочками, произносит слова благодарности за их труд и угощает конфетами.',
      name: 'hrenb2.jpg',
      lastUpdated: dt2
    },
    {
      id: 3,
      contentType: ContentType.Video,
      description: 'Видео по самой важной охране труда',
      name: 'videooo.mp4',
      lastUpdated: dt3
    },
    {
      id: 4,
      contentType: ContentType.WebPage,
      description: 'Тут мегааваттница конечно',
      name: 'http://pacman:megawattnitsamegawattnitsamegawattnitsamegawattnitsamegawattnitsamegawattnitsa',
      lastUpdated: dt4
    },
  ]

  const navigate = useNavigate();

  const { data: dt, isLoading, isError } = useGetAllContentQuery(null);

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
      render: (_, rec) => {
        let col = COLORS.CONTENT_WEB_PAGE;
        switch (rec.contentType) {
          case ContentType.Picture: col = COLORS.CONTENT_IMAGE;
            break;
          case ContentType.Video: col = COLORS.CONTENT_VIDEO;
            break;
        }
        return (
          <div className='content-row content-row__first-item' style={{
            borderColor: col,
          }
          }>{rec.name}</div>
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
      render: (_, rec) => {
        let col = COLORS.CONTENT_WEB_PAGE;
        switch (rec.contentType) {
          case ContentType.Picture: col = COLORS.CONTENT_IMAGE;
            break;
          case ContentType.Video: col = COLORS.CONTENT_VIDEO;
            break;
        }
        return (
          <div className='content-row content-row__middle-item' style={{
            borderColor: col,
          }
          }>{rec.description}</div>
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
      render: (_, rec) => {
        let col = COLORS.CONTENT_WEB_PAGE;
        switch (rec.contentType) {
          case ContentType.Picture: col = COLORS.CONTENT_IMAGE;
            break;
          case ContentType.Video: col = COLORS.CONTENT_VIDEO;
            break;
        }
        return (
          <div className='content-row content-row__last-item' style={{
            borderColor: col,
          }
          }>{rec.lastUpdated.toLocaleString()}</div>
        )
      }
    }
  ]

  if (isLoading) return (
    <Card>
      <Spin indicator={<LoadingOutlined spin />} />
    </Card>
  )
  if (isError) return (
    <ContentErrorCard />
  )
  return (
    <Fragment>
      <hr />
      <div className='contents-page__subheader'>
        <div className='contents-page__subheader__buttons-block'>
          buttons
        </div>
        <div className='contents-page__subheader__legend-block'>
          <div style={{ borderColor: COLORS.CONTENT_WEB_PAGE }} className='legend-item'>&nbsp;-&nbsp;веб-страница</div>
          <div style={{ borderColor: COLORS.CONTENT_VIDEO }} className='legend-item'>&nbsp;-&nbsp;видео</div>
          <div style={{ borderColor: COLORS.CONTENT_IMAGE }} className='legend-item'>&nbsp;-&nbsp;изображение</div>
        </div>
      </div>
      <Table<TGetContentDto>
        columns={columns}
        dataSource={data}
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
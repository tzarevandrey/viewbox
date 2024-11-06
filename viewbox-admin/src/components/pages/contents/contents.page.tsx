import { Card, Spin, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { Functional } from '../../../core/enums/functional.enum';
import { Subpage } from '../../../core/enums/subpages.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { LoadingOutlined } from '@ant-design/icons';
import { ContentErrorCard } from './content.error-card';
import { TGetContentDto } from './dto/get.content.dto';
import { ContentType } from '../../../core/enums/content.enum';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type TProps = {
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const Contents = ({ subpages, functionals }: TProps) => {

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
      itemId: 1,
      name: 'hrenb.jpg',
      lastUpdated: dt1
    },
    {
      id: 2,
      contentType: ContentType.Picture,
      description: 'Ещё более красивая картинка с энергоблоками',
      itemId: 1,
      name: 'hrenb2.jpg',
      lastUpdated: dt2
    },
    {
      id: 3,
      contentType: ContentType.Video,
      description: 'Видео по самой важной охране труда',
      itemId: 1,
      name: 'videooo.mp4',
      lastUpdated: dt3
    },
    {
      id: 4,
      contentType: ContentType.WebPage,
      description: 'Тут мегааваттница конечно',
      itemId: 1,
      name: 'http://pacman:megawattnitsa',
      lastUpdated: dt4
    },
  ]

  const navigate = useNavigate();

  const { data: dt, isLoading, isError } = useGetAllContentQuery(null);

  const columns: TableProps<TGetContentDto>['columns'] = [
    {
      title: 'Вид контента',
      dataIndex: 'contentType',
      key: 'contentType',
      sorter: {
        compare: (a, b) => {
          let x = 0;
          let y = 0;
          switch (a.contentType) {
            case ContentType.Picture: x = 2;
              break;
            case ContentType.Video: x = 1;
              break;
            case ContentType.WebPage: x = 3;
              break;
          }
          switch (b.contentType) {
            case ContentType.Picture: x = 2;
              break;
            case ContentType.Video: x = 1;
              break;
            case ContentType.WebPage: x = 3;
              break;
          }
          return x - y;
        },
        multiple: 3
      }
    },
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
        multiple: 2
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
        multiple: 1
      }
    },
    {
      title: 'Дата создания/изменения',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (dt) => `${dt}`,
      sorter: {
        compare: (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime(),
        multiple: 4
      },
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
    <Table<TGetContentDto>
      columns={columns}
      dataSource={data}
      rowKey={item => item.id}
      onRow={item => {
        if (!subpages?.includes(Subpage.ContentView)) return {};
        return {
          onClick: () => { navigate(`/contents/${item.id}`) }
        }
      }}
    />
  )
}
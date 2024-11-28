import { Button, Table, TableProps } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '../../../core/enums/pages.enum';
import { COLORS } from '../../../core/constants/colors';
import moment from 'moment';
import { TContent } from '../../../core/types/content';
import { getContentColor, getContentName, getPageLink } from '../../../utils/func';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';

type TProps = {
  functionals?: Functional[];
}

export const Contents = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Контент'))
    // eslint-disable-next-line
  }, [])

  const {
    data: contents,
    isLoading: contentsLoading,
    isError: contentsLoadingError
  } = useGetAllContentQuery(null);

  const columns: TableProps<TContent>['columns'] = [
    {
      title: 'Файл/Ссылка',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => {
          const x = getContentName(a).toLowerCase();
          const y = getContentName(b).toLowerCase();
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        },
      },
      render: (_, content) => {

        return (
          <div className='content-row content-row__first-item' style={{
            borderColor: getContentColor(content),
          }
          }>{getContentName(content)}</div>
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
        return (
          <div className='content-row content-row__middle-item' style={{ borderColor: getContentColor(content) }
          }>{content.description}</div>
        )
      }
    },
    {
      title: 'Дата создания/изменения',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      sorter: {
        compare: (a, b) => (new Date(b.lastUpdated ?? 0).getTime() - new Date(a.lastUpdated ?? 0).getTime()),
      },
      render: (_, content) => {
        return (
          <div
            className='content-row content-row__last-item'
            style={{ borderColor: getContentColor(content) }}
          >{moment(content.lastUpdated).format('DD.MM.YYYY HH:mm')}</div>
        )
      }
    }
  ]

  if (contentsLoading) return <Loading />
  if (contentsLoadingError) return <Error />
  return (
    <Fragment>
      <div className='contents-page__subheader'>
        <div className='contents-page__subheader__buttons-block buttons-block'>
          {functionals?.includes(Functional.Create) ? (
            <Button
              onClick={() => {
                const link = getPageLink(Page.Contents, Functional.Create);
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
      <Table<TContent>
        bordered
        size='small'
        columns={columns}
        dataSource={[...contents ?? []].sort((a, b) => new Date(b.lastUpdated ?? 0).getTime() - new Date(a.lastUpdated ?? 0).getTime())}
        rowHoverable
        rowKey={item => item.id ?? 0}
        onRow={item => {
          if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
          return {
            onClick: () => {
              const link = getPageLink(Page.Contents, Functional.Read);
              if (link) navigate(link.replace(':id', `${item.id}`));
            }
          }
        }}
      />
    </Fragment>
  )
}
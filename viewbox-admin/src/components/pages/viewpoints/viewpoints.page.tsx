import { Fragment, useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableProps } from 'antd';
import { Page } from '../../../core/enums/pages.enum';
import { useGetAllViewpointsQuery } from '../../../api/viewpoints.api';
import { TViewpoint } from '../../../core/types/viewpoint';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';
import { getPageLink } from '../../../utils/func';

type TProps = {
  functionals?: Functional[];
}

export const Viewpoints = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setTitle('Панели воспроизведения'))
    // eslint-disable-next-line
  }, [])

  const {
    data: viewpoints,
    isLoading: viewpointsLoading,
    isError: viewpointsLoadingError
  } = useGetAllViewpointsQuery(null);

  const columns: TableProps<TViewpoint>['columns'] = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: {
        compare: (a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        }
      },
      render: (_, viewpoint) => {
        return (
          <div className='viewpoints-row'>{viewpoint.name}</div>
        )
      }
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
      sorter: {
        compare: (a, b) => {
          const x = (a.description ?? '').toLowerCase();
          const y = (b.description ?? '').toLowerCase();
          if (x > y) return 1;
          if (x < y) return -1;
          return 0;
        }
      },
      render: (_, viewpoint) => {
        return (
          <div className='viewpoints-row'>{viewpoint.description}</div>
        )
      }
    },
  ]

  if (viewpointsLoading) return <Loading />
  if (viewpointsLoadingError) return <Error />

  return (
    <Fragment>
      <div className='viewpoints-page__subheader'>
        <div className='viewpoints-page__subheader__buttons-block buttons-block'>
          {functionals?.includes(Functional.Create) ? (
            <Button
              onClick={() => {
                const link = getPageLink(Page.Viewpoints, Functional.Create);
                if (link) navigate(link);
              }}
            >Создать панель воспроизведения</Button>
          ) : null}
        </div>
      </div>
      <Table<TViewpoint>
        bordered
        size='small'
        columns={columns}
        dataSource={viewpoints}
        rowHoverable
        rowKey={item => item.id ?? 0}
        onRow={item => {
          if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
          return {
            onClick: () => {
              const link = getPageLink(Page.Viewpoints, Functional.Read);
              if (link) navigate(link.replace(':id', `${item.id}`));
            },
            style: { cursor: 'pointer' }
          }
        }}
      />
    </Fragment>
  )
}
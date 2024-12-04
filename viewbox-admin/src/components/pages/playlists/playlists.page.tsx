import { Fragment, useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useNavigate } from 'react-router-dom';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';
import { Button, Table, TableProps } from 'antd';
import { Page } from '../../../core/enums/pages.enum';
import { TPlaylist } from '../../../core/types/playlist';
import { Loading } from '../../shared/loading/loading.page';
import { Error } from '../../shared/error/error.page';
import { getPageLink } from '../../../utils/func';

type TProps = {
  functionals?: Functional[];
}

export const Playlists = ({ functionals }: TProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('Списки воспроизведения'))
    // eslint-disable-next-line
  }, [])

  const navigate = useNavigate();

  const {
    data: playlists,
    isLoading: playlistsLoading,
    isError: playlistsLoadingError
  } = useGetAllPlaylistsQuery(null);

  const columns: TableProps<TPlaylist>['columns'] = [
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
      render: (_, playlist) => {
        return (
          <div className='playlists-row'>{playlist.name}</div>
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
      render: (_, playlist) => {
        return (
          <div className='playlists-row'>{playlist.description}</div>
        )
      }
    },
  ]

  if (playlistsLoading) return <Loading />
  if (playlistsLoadingError) return <Error />

  return (
    <Fragment>
      <div className='playlists-page__subheader'>
        <div className='playlists-page__subheader__buttons-block buttons-block'>
          {functionals?.includes(Functional.Create) ? (
            <Button
              onClick={() => {
                const link = getPageLink(Page.Playlists, Functional.Create);
                if (link) navigate(link);
              }}
            >Создать список воспроизведения</Button>
          ) : null}
        </div>
      </div>
      <Table<TPlaylist>
        locale={{ emptyText: 'списки воспроизведения отсутствуют' }}
        bordered
        size='small'
        columns={columns}
        dataSource={playlists}
        rowHoverable
        rowKey={item => item.id ?? 0}
        onRow={item => {
          if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
          return {
            onClick: () => {
              const link = getPageLink(Page.Playlists, Functional.Read);
              if (link) navigate(link.replace(':id', `${item.id}`));
            },
            style: { cursor: 'pointer' }
          }
        }}
      />
    </Fragment>
  )
}
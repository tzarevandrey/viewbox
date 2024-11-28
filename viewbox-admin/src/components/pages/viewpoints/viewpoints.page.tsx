import { Fragment, useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useNavigate } from 'react-router-dom';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';
import { Button, Table, TableProps } from 'antd';
import { TGetPlaylistDto } from './dto/get.viewpoints.dto';
import { PlaylistsLoadingPage } from './viewpoints.loading.page';
import { PlaylistsErrorPage } from './viewpoints.error.page';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';

type TProps = {
  functionals?: Functional[];
}

export const Viewpoints = ({ functionals }: TProps) => {
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

  const columns: TableProps<TGetPlaylistDto>['columns'] = [
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

  if (playlistsLoading) return <PlaylistsLoadingPage />
  if (playlistsLoadingError) return <PlaylistsErrorPage />

  return (
    <Fragment>
      <div className='playlists-page__subheader'>
        <div className='playlists-page__subheader__buttons-block buttons-block'>
          {functionals?.includes(Functional.Create) ? (
            <Button
              onClick={() => {
                const link = PAGES_CONFIG[Page.Playlists].subpages.find(x => x.functionals.includes(Functional.Create))?.link;
                if (link) navigate(link);
              }}
            >Создать список воспроизведения</Button>
          ) : null}
        </div>
      </div>
      <Table<TGetPlaylistDto>
        bordered
        size='small'
        columns={columns}
        dataSource={playlists}
        rowHoverable
        rowKey={item => item.id}
        onRow={item => {
          if (!(functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update))) return {};
          return {
            onClick: () => {
              const link = PAGES_CONFIG[Page.Playlists].subpages.find(x => x.functionals.includes(Functional.Read))?.link;
              if (link) navigate(link.replace(':id', `${item.id}`));
            },
            style: { cursor: 'pointer' }
          }
        }}
      />
    </Fragment>
  )
}
import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useDeletePlaylistMutation, useGetPlaylistQuery } from '../../../api/playlists.api';
import { Fragment, useEffect } from 'react';
import { PlaylistsLoadingPage } from './playlists.loading.page';
import { PlaylistsErrorPage } from './playlists.error.page';
import { Button, Flex } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';
import { openModal } from '../../../reducers/modal.slice';
import { DeleteModal } from '../../shared/delete-modal/delete.modal';
import { COLORS } from '../../../core/constants/colors';
import { PlaylistItemsTable } from './playlist-items.table';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Playlist = ({ functionals }: TProps) => {

  const { id: playlistId } = useParams<TParams>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [deletePlaylist] = useDeletePlaylistMutation();

  const {
    data: playlist,
    isLoading: playlistLoading,
    isError: playlistLoadingError
  } = useGetPlaylistQuery(playlistId ? +playlistId : 0)

  useEffect(() => {
    let name = '';
    if (playlist) {
      name = `«${playlist.name}»`
    }
    dispatch(setTitle(`Список воспроизведения ${name}`));
    // eslint-disable-next-line
  }, [playlist])

  if (playlistLoading) return <PlaylistsLoadingPage />
  if (playlistLoadingError) return <PlaylistsErrorPage />

  return (
    <Fragment>
      <div className='playlist-page__subheader'>
        <div className='playlist-page__subheader__legend-block'>
          <div style={{ borderColor: COLORS.CONTENT_WEB_PAGE }} className='legend-item'>&nbsp;-&nbsp;веб-страница</div>
          <div style={{ borderColor: COLORS.CONTENT_VIDEO }} className='legend-item'>&nbsp;-&nbsp;видео</div>
          <div style={{ borderColor: COLORS.CONTENT_IMAGE }} className='legend-item'>&nbsp;-&nbsp;изображение</div>
          <div className='playlist__view__value_planned'>показ запланирован</div>
          <div className='playlist__view__value_expired'>период показа истёк</div>
        </div>
      </div>
      <div className='playlist__view'>
        <div className='playlist__view__label'>Идентификатор:</div>
        <div className='playlist__view__value'>{playlist?.id}</div>
        <div className='playlist__view__label'>Имя списка:</div>
        <div className='playlist__view__value'>{playlist?.name}</div>
        <div className='playlist__view__label'>Описание:</div>
        <div className='playlist__view__value'>{playlist?.description}</div>
        <div className='playlist__view__label'>Элементы списка:</div>
        <div className='playlist__view__table'>
          {playlist && playlist.items.length > 0
            ? <PlaylistItemsTable items={playlist.items} functionals={functionals} />
            : <div className='playlist__view__value_out'>Элементы отсутствуют</div>
          }
        </div>
        <Flex className='buttons-block buttons-block_left'>
          <Button
            type='default'
            htmlType='button'
            onClick={() => navigate(-1)}
          >Назад</Button>
          {functionals?.includes(Functional.Update) ? (
            <Button
              type='default'
              htmlType='button'
              onClick={() => {
                if (playlistId) {
                  const link = PAGES_CONFIG[Page.Playlists].subpages.find(x => x.functionals.includes(Functional.Update))?.link;
                  if (link) navigate(link.replace(':id', playlistId));
                }
              }}
            >Изменить</Button>
          ) : null}
          {functionals?.includes(Functional.Delete) ? (
            <Button
              type='default'
              htmlType='button'
              danger
              onClick={() => {
                if (playlistId) {
                  dispatch(openModal(() =>
                    <DeleteModal
                      handler={() => {
                        deletePlaylist(+playlistId).then(() => navigate(PAGES_CONFIG[Page.Playlists].link))
                      }}
                      text={`список воспроизведения «${playlist?.name}»`}
                    />
                  ))
                }
              }}
            >Удалить</Button>
          ) : null}
        </Flex>
      </div>
    </Fragment>
  )
}
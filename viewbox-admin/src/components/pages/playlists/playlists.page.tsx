import { useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useNavigate } from 'react-router-dom';
import { useGetAllPlaylistsQuery } from '../../../api/playlists.api';

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
  return (
    <></>
  )
}
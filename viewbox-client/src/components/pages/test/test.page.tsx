import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useGetPlaylistMutation } from '../../../api/playlist.api';
import { Fragment, useEffect } from 'react';
import { PlayPartCurrent } from '../play/play.part.current';
import { PlayPartNext } from '../play/play.part.next';
import { setItems } from '../../../reducers/play.slice';

type TParams = {
  id: string;
}

export const Test = () => {

  const { id: playlistId } = useParams<TParams>();
  const { flag } = useAppSelector(x => x.play);
  const { token } = useAppSelector(x => x.user);

  const [getPlaylist] = useGetPlaylistMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token !== '') {
      getPlaylist(playlistId ? +playlistId : 0).unwrap().then(data => dispatch(setItems(data)));
    }
    // eslint-disable-next-line
  }, [token, flag]);

  return (
    <Fragment>
      <PlayPartCurrent flag={flag} />
      <PlayPartNext flag={flag} />
    </Fragment>
  )
}
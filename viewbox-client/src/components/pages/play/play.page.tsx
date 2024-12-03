import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { Fragment, useEffect } from "react";
import { PlayPartCurrent } from './play.part.current';
import { PlayPartNext } from './play.part.next';
import { useGetActualPlaylistMutation } from '../../../api/viewpoint.api';
import { setItems } from '../../../reducers/play.slice';

type TParams = {
  id: string;
}

export const Play = () => {

  const { id: viewpointId } = useParams<TParams>();
  const { flag } = useAppSelector(x => x.play);
  const { token } = useAppSelector(x => x.user);

  const [getPlaylist] = useGetActualPlaylistMutation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token !== '') {
      getPlaylist(viewpointId ? +viewpointId : 0).unwrap().then(data => dispatch(setItems(data)));
    }
  }, [token, flag]);

  return (
    <Fragment>
      <PlayPartCurrent flag={flag} />
      <PlayPartNext flag={flag} />
    </Fragment>
  )
}
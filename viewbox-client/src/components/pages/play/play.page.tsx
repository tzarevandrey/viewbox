import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useGetActualPlaylistQuery } from "../../../api/viewpoint.api";
import { useEffect } from "react";
import { setNext } from "../../../reducers/play.slice";

type TParams = {
  id: string;
}

export const Play = () => {

  const { id: viewpointId } = useParams<TParams>();
  const dispatch = useAppDispatch();

  const {
    data: items,
    isLoading,
    isError,
  } = useGetActualPlaylistQuery(viewpointId ? +viewpointId : 0);

  useEffect(() => {
    if (items) dispatch(setNext(items));
    // eslint-disable-next-line
  }, [items]);

  const { currentList } = useAppSelector(x => x.play);

  return (
    <></>
  )
}
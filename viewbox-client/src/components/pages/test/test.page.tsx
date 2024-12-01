import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";

type TParams = {
  id: string;
}

export const Test = () => {

  const { id: playlistId } = useParams<TParams>();
  const dispatch = useAppDispatch();

  return (
    <></>
  )
}
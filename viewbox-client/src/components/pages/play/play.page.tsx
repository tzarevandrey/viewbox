import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";

type TParams = {
  id: string;
}

export const Play = () => {

  const { id: viewpointId } = useParams<TParams>();
  const dispatch = useAppDispatch();

  return (
    <></>
  )
}
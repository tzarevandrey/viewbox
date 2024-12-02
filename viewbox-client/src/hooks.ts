import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useGetAuthQuery } from "./api/auth-api";
import { TAuthResponseDto } from "./core/types/auth.response.dto";
import { useGetActualPlaylistQuery } from './api/viewpoint.api';
import { goNext, setItems } from './reducers/play.slice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = (): { isLoading: boolean, isError: boolean, data: TAuthResponseDto | undefined } => {
  const {
    data,
    isLoading,
    isError
  } = useGetAuthQuery(0);
  return { isLoading, isError, data };
}

export const useViewpoint = (id: number) => {
  const dispatch = useAppDispatch();
  const { data, isError } = useGetActualPlaylistQuery(id);
  if (data) {
    dispatch(setItems(data));
  } else {
    if (isError) dispatch(goNext());
  }
}

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { useGetAuthQuery } from "./api/auth-api";
import { TAuthResponseDto } from "./core/types/auth.response.dto";

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

export const useTitle = (title: string) => {
  const element = document.getElementById('title-field');
  if (element) element.innerText = title;
}

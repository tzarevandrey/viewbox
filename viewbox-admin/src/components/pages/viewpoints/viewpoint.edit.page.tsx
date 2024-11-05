import { useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetViewpointQuery } from '../../../api/viewpoints.api';

type TProps = {
  functionals?: Functional[];
}

export const ViewpointEdit = ({ functionals }: TProps) => {
  const { id } = useParams();
  const { data } = useGetViewpointQuery(+id!);
  const dispatch = useAppDispatch();
  dispatch(setTitle(`Панель воспроизведения ${data?.name}`));
  return (
    <></>
  )
}
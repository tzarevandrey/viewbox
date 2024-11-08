import { useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetViewpointQuery } from '../../../api/viewpoints.api';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Viewpoint = ({ functionals }: TProps) => {
  const { id } = useParams<TParams>();
  const dispatch = useAppDispatch();

  dispatch(setTitle(id === 'new' ? 'Новая панель воспроизведения'));

  return (
    <div>{id}</div>
  )
}
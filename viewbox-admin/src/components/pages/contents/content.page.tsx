import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';

type TProps = {
  functionals?: Functional[];
}

export const Content = ({ functionals }: TProps) => {
  const dispatch = useAppDispatch();
  dispatch(setTitle('Панели воспроизведения'));
  return (
    <div>content je</div>
  )
}
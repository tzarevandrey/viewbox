import { Functional } from '../../../core/enums/functional.enum';
import { Subpage } from '../../../core/enums/subpages.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';

type TProps = {
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const Groups = ({ subpages, functionals }: TProps) => {
  const dispatch = useAppDispatch();
  dispatch(setTitle('Панели воспроизведения'));
  return (
    <></>
  )
}
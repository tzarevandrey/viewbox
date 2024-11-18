import { useEffect } from 'react';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';

type TProps = {
  functionals?: Functional[];
}

export const Content = ({ functionals }: TProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('Элемент контента'));
    // eslint-disable-next-line
  }, [])
  return (
    <div>content je</div>
  )
}
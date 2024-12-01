import { useEffect } from 'react';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';

export const Manual = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle('Руководство пользователя'));
    // eslint-disable-next-line
  }, [])

  return (
    <iframe
      style={{ border: 0, width: '100%', height: '100%' }}
      src={`./manual.pdf`}
      title='Руководство пользователя'
    />
  )
}
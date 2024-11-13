import { useNavigate, useParams } from 'react-router-dom';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { Fragment, useEffect } from 'react';
import { useGetViewpointQuery } from '../../../api/viewpoints.api';
import { Button } from 'antd';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';
import { Page } from '../../../core/enums/pages.enum';

type TProps = {
  functionals?: Functional[];
}

type TParams = {
  id: string;
}

export const Viewpoint = ({ functionals }: TProps) => {

  const { id } = useParams<TParams>();

  const navigate = useNavigate();

  const {
    data,
    isLoading,
    isError
  } = useGetViewpointQuery(id ? +id : 0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle(`Панель воспроизведения ${data?.name}`))
    // eslint-disable-next-line
  }, [data])


  return (
    <Fragment>
      <div>{id}</div>
      <Button onClick={() => {
        if (id) {
          const link = PAGES_CONFIG[Page.Viewpoints].subpages.find(x => x.functionals.includes(Functional.Update))?.link;
          if (link) navigate(link.replace(':id', id));
        }
      }}>edit</Button>
    </Fragment>
  )
}
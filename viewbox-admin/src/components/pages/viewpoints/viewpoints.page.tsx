import { Flex } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetAllViewpointsQuery } from '../../../api/viewpoints.api';
import { ViewpointsErrorCard } from './viepoints.error-card';
import { ViewpointsCard } from './viepoints.card';
import { ViewpointsAddCard } from './viewpoints.add-card';
import { useEffect } from 'react';
import { ViewpointsLoadingCard } from './viewpoints.loading-card';

type TProps = {
  functionals?: Functional[];
}

export const Viewpoints = ({ functionals }: TProps) => {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTitle('Панели воспроизведения'));
    // eslint-disable-next-line
  }, [])

  const {
    data: viewpoints,
    isLoading: viewpointsLoading,
    isError: viewpointsLoadingError
  } = useGetAllViewpointsQuery(null);

  if (viewpointsLoading) return <ViewpointsLoadingCard />

  if (viewpointsLoadingError) return <ViewpointsErrorCard />

  return (
    <Flex wrap gap='small'>
      {viewpoints ? [...viewpoints].sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }).map(vps => (
        <ViewpointsCard
          key={vps.id}
          viewpoint={vps}
          isDetailed={functionals?.includes(Functional.Read) || functionals?.includes(Functional.Update)}
        />
      )) : null}
      {functionals?.includes(Functional.Create) ? (
        <ViewpointsAddCard />
      ) : null}
    </Flex>
  )
}
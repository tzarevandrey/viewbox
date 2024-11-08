import { Card, Flex, Spin } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetAllViewpointsQuery } from '../../../api/viewpoints.api';
import { LoadingOutlined } from '@ant-design/icons';
import { ViewpointsErrorCard } from './viepoints.error-card';
import { ViewpointsCard } from './viepoints.card';
import { ViewpointsAddCard } from './viewpoints.add-card';
import { useEffect } from 'react';
import { TGetViewpointDto } from './dto/get.viewpoint.dto';

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
    data: dt, isLoading, isError
  } = useGetAllViewpointsQuery(null);
  const data: TGetViewpointDto[] = [
    {
      id: 1,
      name: 'панель 1',
    },
    {
      id: 2,
      name: 'панель 2',
      description: 'эта панель с описанием'
    },
  ]
  if (isLoading) return (
    <Card>
      <Spin indicator={<LoadingOutlined spin />} />
    </Card>
  )
  if (isError) return (
    <ViewpointsErrorCard />
  )
  return (
    <Flex wrap gap='small'>
      {data ? data.sort((a, b) => {
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
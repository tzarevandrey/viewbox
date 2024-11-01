import { Card, Flex, Spin } from 'antd';
import { Functional } from '../../../core/enums/functional.enum';
import { Subpage } from '../../../core/enums/subpages.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { useGetAllViewpointsQuery } from '../../../api/viewpoints.api';
import { LoadingOutlined } from '@ant-design/icons';
import { ViewpointsErrorCard } from './viepoints.error-card';
import { ViewpointsCard } from './viepoints.card';
import { ViewpointsAddCard } from './viewpoints.add-card';
import { useEffect } from 'react';

type TProps = {
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const Viewpoints = ({ subpages, functionals }: TProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('Панели воспроизведения'));
    // eslint-disable-next-line
  }, [])
  const {
    data, isLoading, isError
  } = useGetAllViewpointsQuery(null);

  if (isLoading) return (
    <Card>
      <Spin indicator={<LoadingOutlined spin />} />
    </Card>
  )
  if (isError) return (
    <Card>
      <ViewpointsErrorCard />
    </Card>
  )
  return (
    <Flex wrap gap='small'>
      {data ? data.map(vps => (
        <ViewpointsCard
          viewpoint={vps}
          isDetailed={subpages?.includes(Subpage.ViewpointView)}
          isEdited={subpages?.includes(Subpage.ViewpointEdit)}
          isDeleted={functionals?.includes(Functional.Delete)}
        />
      )) : null}
      {functionals?.includes(Functional.Add) ? (
        <ViewpointsAddCard />
      ) : null}
    </Flex>
  )
}
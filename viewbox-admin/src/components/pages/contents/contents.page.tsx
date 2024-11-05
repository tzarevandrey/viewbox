import { Card, Flex, Spin } from 'antd';
import { useGetAllContentQuery } from '../../../api/content.api';
import { Functional } from '../../../core/enums/functional.enum';
import { Subpage } from '../../../core/enums/subpages.enum';
import { useAppDispatch } from '../../../hooks';
import { setTitle } from '../../../reducers/title.slice';
import { ContentCard } from './content.card';
import { LoadingOutlined } from '@ant-design/icons';
import { ContentErrorCard } from './content.error-card';
import { ContentAddCard } from './content.add-cart';

type TProps = {
  subpages?: Subpage[];
  functionals?: Functional[];
}

export const Contents = ({ subpages, functionals }: TProps) => {
  const dispatch = useAppDispatch();
  dispatch(setTitle('Элементы контента'));
  const { data, isLoading, isError } = useGetAllContentQuery(null);
  if (isLoading) return (
    <Card>
      <Spin indicator={<LoadingOutlined spin />} />
    </Card>
  )
  if (isError) return (
    <ContentErrorCard />
  )
  return (
    <Flex wrap gap='small'>
      {data ? data.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }).map(cntn => (
        <ContentCard
          key={cntn.id}
          content={cntn}
          isDetailed={subpages?.includes(Subpage.ContentView)}
        />
      )) : null}
      {functionals?.includes(Functional.Add) ? (
        <ContentAddCard />
      ) : null}
    </Flex>
  )
}
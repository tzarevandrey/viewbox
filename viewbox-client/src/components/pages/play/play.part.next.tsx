import { useAppSelector } from '../../../hooks';
import { ViewItem } from '../../shared/view-item.element';

type TProps = {
  flag: boolean;
}

export const PlayPartNext = ({ flag }: TProps) => {

  const { nextList } = useAppSelector(x => x.play);

  return (
    <div className={`content-view ${!flag ? 'content-view_now' : 'content-view_next'}`}>
      {nextList.map(item => <ViewItem key={`next${item.position}`} item={item} runFlag={flag === false} />)}
    </div>
  )
}
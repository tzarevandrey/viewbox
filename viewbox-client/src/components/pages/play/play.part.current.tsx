import { useAppSelector } from '../../../hooks';
import { ViewItem } from '../../shared/view-item.element';

type TProps = {
  flag: boolean;
}

export const PlayPartCurrent = ({ flag }: TProps) => {

  const { currentList } = useAppSelector(x => x.play);

  return (
    <div className={`content-view ${flag ? 'content-view_now' : 'content-view_next'}`}>
      {currentList.map(item => <ViewItem key={`current${item.position}`} item={item} runFlag={flag === true} />)}
    </div>
  )
}
import { useParams } from "react-router-dom";
import { useAppSelector, useViewpoint } from "../../../hooks";
import { Fragment } from "react";
import { ViewItem } from '../../shared/view-item.element';

type TParams = {
  id: string;
}

export const Play = () => {

  const { id: viewpointId } = useParams<TParams>();
  useViewpoint(viewpointId ? +viewpointId : 0);

  const { currentList, nextList, flag } = useAppSelector(x => x.play);

  return (
    <Fragment>
      <div className={`content-view ${flag ? 'content-view_now' : 'content-view_next'}`}>
        {currentList.map(item => <ViewItem key={`current${item.position}`} item={item} runFlag={true} />)}
      </div>
      <div className={`content-view ${!flag ? 'content-view_now' : 'content-view_next'}`}>
        {nextList.map(item => <ViewItem key={`next${item.position}`} item={item} runFlag={false} />)}
      </div>
    </Fragment>
  )
}
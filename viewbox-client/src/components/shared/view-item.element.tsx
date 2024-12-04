import { useEffect } from 'react';
import { TPlaylistItem } from '../../core/types/playlist-item'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ContentType } from '../../core/enums/content.enum';
import { goNext } from '../../reducers/play.slice';
import { NUMBERS } from '../../core/constants/numbers';
import { URLS } from '../../core/constants/urls';

type TProps = {
  item: TPlaylistItem;
  runFlag: boolean;
}

export const ViewItem = ({ item, runFlag }: TProps) => {

  const dispatch = useAppDispatch();

  const { currentIndex, flag } = useAppSelector(x => x.play);

  useEffect(() => {
    if (runFlag
      && (item.contentItem.contentType === ContentType.Picture || item.contentItem.contentType === ContentType.WebPage)
      && currentIndex === item.position) {
      setTimeout(() => {
        dispatch(goNext());
      }, (item.duration ?? NUMBERS.DEFAULT_DURATION) * 1000);
    }
    // eslint-disable-next-line
  }, [currentIndex, flag]);

  let extendedClass = currentIndex === item.position && runFlag ? 'content__viewed' : 'content__hided';

  if (item.contentItem.contentType === ContentType.Picture) return (
    <div className={`content__image ${extendedClass}`}>
      <img src={`${URLS.BASE_API}/${item.contentItem.name}`} alt='' />
    </div>
  )

  if (item.contentItem.contentType === ContentType.WebPage) return (
    <div className={`content__webpage ${extendedClass}`}>
      <iframe src={item.contentItem.name} title={`${item.contentItem.name}_${item.position}`} />
    </div>
  )

  if (item.contentItem.contentType === ContentType.Video) return (
    <div className={`content__video ${extendedClass}`}>
      <video
        controls={false}
        preload='true'
        onEnded={() => dispatch(goNext())}
      >
        <source src={`${URLS.BASE_API}/${item.contentItem.name}`} />
      </video>
    </div>
  )

  return <></>
}
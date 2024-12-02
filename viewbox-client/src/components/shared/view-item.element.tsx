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
    if ((item.contentItem.contentType === ContentType.Picture || item.contentItem.contentType === ContentType.WebPage)
      && currentIndex === item.position
      && flag === runFlag) {
      setTimeout(() => dispatch(goNext()), (item.duration ?? NUMBERS.DEFAULT_DURATION) * 1000);
    }
  }, [currentIndex]);

  let extendedClass = currentIndex === item.position && flag === runFlag ? 'content__viewed' : 'content__hided';

  if (item.contentItem.contentType === ContentType.Picture) return (
    <img
      className={`content__image ${extendedClass}`}
      src={`${URLS.BASE_API}/${item.contentItem.name}`}
    />
  )

  if (item.contentItem.contentType === ContentType.WebPage) return (
    <iframe
      className={`content__webpage ${extendedClass}`}
      src={item.contentItem.name}
    />
  )

  if (item.contentItem.contentType === ContentType.Video) return (
    <video
      controls={false}
      preload='true'
      className={`content__video ${extendedClass}`}
      onEnded={() => dispatch(goNext())}
    >
      <source src={`${URLS.BASE_API}/${item.contentItem.name}`} />
    </video>
  )

  return <></>
}
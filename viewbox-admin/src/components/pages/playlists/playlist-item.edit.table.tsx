import { FC, forwardRef, useState } from 'react';
import { TCreatePlaylistItemDto } from './dto/create.playlists.dto';
import { TContent } from '../../../core/types/content';
import { ContentType } from '../../../core/enums/content.enum';

type TProps = {
  tableItems?: TCreatePlaylistItemDto[];
}

export const PlaylistItemEditTable = forwardRef<unknown, TProps>(({ tableItems = [] }, ref) => {
  const [items, setItems] = useState<TCreatePlaylistItemDto[]>(tableItems);

  return (
    <div
      className={`playlist__content__value playlist__content_name playlist__content-row__first-item ${extClassName}`}
      style={{ borderColor: color }}
    >{name}</div>
  )
})
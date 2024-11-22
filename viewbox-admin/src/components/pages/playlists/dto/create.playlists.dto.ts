import { ContentType } from '../../../../core/enums/content.enum';

export type TCreatePlaylistDto = {
  name: string;
  description: string | null;
  items: TCreatePlaylistItemDto[];
}

export type TCreatePlaylistItemDto = {
  contentItemId: number;
  position: number;
  duration: number | null;
  startDate: Date | null;
  expireDate: Date | null;
  contentName: string;
  contentType: ContentType;
}
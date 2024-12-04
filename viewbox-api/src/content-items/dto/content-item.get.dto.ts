import { ContentType } from 'src/core/enums/content-types.enum';
import { ImageItem } from '../image-items.model';
import { VideoItem } from '../video-items.model';
import { WebpageItem } from '../webpage-items.model';

export class ContentItemGetDto {
  id: number;
  name: string;
  contentType: ContentType;
  lastUpdated: Date;
  description: string | null;
  imageItem?: ImageItem;
  videoItem?: VideoItem;
  webpageItem?: WebpageItem;
  playlists: {
    id: number;
    name: string;
  }[];
}
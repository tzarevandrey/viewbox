import { ContentType } from '../enums/content.enum';
import { TPlaylist } from './playlist';

export type TContent = {
  id: number;
  name: string;
  contentType: ContentType;
  description: string | null;
  lastUpdated: Date;
  imageItem?: {
    id: number;
    originalName: string;
  },
  videoItem?: {
    id: number;
    originalName: string;
  },
  webpageItem?: {
    id: number;
  },
  playlists?: TPlaylist[];
}
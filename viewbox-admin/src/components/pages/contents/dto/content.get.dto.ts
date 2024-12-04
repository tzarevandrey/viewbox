import { ContentType } from '../../../../core/enums/content.enum';

export type TContentGetDto = {
  id: number;
  name: string;
  contentType: ContentType;
  lastUpdated: Date;
  description: string | null;
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
  playlists: {
    id: number;
    name: string;
  }[];
}
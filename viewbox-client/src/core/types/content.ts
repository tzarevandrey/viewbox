import { ContentType } from '../enums/content.enum';
import { TPlaylist } from './playlist';

export type TContent = {
  id: number;
  name: string;
  contentType: ContentType;
  description?: string | null;
  lastUpdated: Date;
}
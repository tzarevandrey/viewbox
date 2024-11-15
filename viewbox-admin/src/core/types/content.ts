import { ContentType } from '../enums/content.enum';

export type TContent = {
  id: number;
  name: string;
  contentType: ContentType;
  description: string | null;
  lastUpdated: Date;
}
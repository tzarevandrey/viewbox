import { ContentType } from "../../../../core/enums/content.enum";

export type TGetContentDto = {
  id: number;
  contentType: ContentType;
  description?: string;
  name: string;
  lastUpdated: Date;
  imageItem?: TImageItem;
  videoItem?: TVideoItem;
}

export type TImageItem = {
  originalName: string;
}

export type TVideoItem = {
  originalName: string;
}
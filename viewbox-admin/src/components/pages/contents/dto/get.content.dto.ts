import { ContentType } from "../../../../core/enums/content.enum";

export type TGetContentDto = {
  id: number;
  contentType: ContentType;
  description?: string;
  name: string;
  lastUpdated: Date;
  imageItem?: TImageItem;
  videoItem?: TVideoItem;
  webpageItem?: TWebpageItem;
}

export type TImageItem = {
  id: number;
  originalName: string;
}

export type TVideoItem = {
  id: number;
  originalName: string;
}

export type TWebpageItem = {
  id: number;
}
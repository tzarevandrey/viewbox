import { ContentType } from "../../../../core/enums/content.enum";

export type TGetContentDto = {
  id: number;
  contentType: ContentType;
  description?: string;
  name: string;
  lastUpdated: Date;
}
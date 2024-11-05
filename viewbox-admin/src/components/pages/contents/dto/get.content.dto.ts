import { ContentType } from "../../../../core/enums/content.enum";

export type TGetContentDto = {
  id: number;
  contentType: ContentType;
  description?: string;
  itemId: number;
  name: string;
  originalName?: string;
}
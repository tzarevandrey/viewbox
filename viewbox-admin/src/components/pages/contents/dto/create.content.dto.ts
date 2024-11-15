import { ContentType } from '../../../../core/enums/content.enum';

export type TCreateContentDto = {
  name?: string;
  description?: string;
  contentType: ContentType;
  file?: File;
}
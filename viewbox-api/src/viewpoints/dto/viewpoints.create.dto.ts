import { VewpointItemCreateDto } from './viewpoint-items.create.dto';

export class ViewpointCreateDto {
  name: string;
  description: string | null;
  items: VewpointItemCreateDto[];
}
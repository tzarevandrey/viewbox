import { VewpointItemUpdateDto } from './viewpoint-items.update.dto';

export class ViewpointsUpdateDto {
  id: number;
  name: string;
  description: string | null;
  items: VewpointItemUpdateDto[];
}
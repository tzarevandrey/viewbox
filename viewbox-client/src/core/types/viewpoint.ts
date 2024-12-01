import { TViewpointItem } from './viewpoint-item';

export type TViewpoint = {
  id: number;
  name: string;
  description: string | null;
  items: TViewpointItem[];
}
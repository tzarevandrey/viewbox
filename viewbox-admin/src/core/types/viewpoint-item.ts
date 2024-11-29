import { TPlaylist } from './playlist';

export type TViewpointItem = {
  id?: number;
  playlist?: TPlaylist;
  startDate: Date | null;
  expireDate: Date | null;
  isDefault: boolean;
}
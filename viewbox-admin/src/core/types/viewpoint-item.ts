import { TPlaylist } from './playlist';

export type TViewpointItem = {
  playlist?: TPlaylist;
  startDate: Date | null;
  expireDate: Date | null;
  isDefault: boolean;
}
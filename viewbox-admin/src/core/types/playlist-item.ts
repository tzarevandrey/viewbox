import { TContent } from './content'
import { TPlaylist } from './playlist';

export type TPlaylistItem = {
  contentItem: TContent;
  position: number;
  duration: number | null;
  startDate: Date | null;
  expireDate: Date | null;
  playlist?: TPlaylist;
}
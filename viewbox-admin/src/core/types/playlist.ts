import { TPlaylistItem } from './playlist-item';
import { TViewpointItem } from './viewpoint-item';

export type TPlaylist = {
  id?: number;
  name: string;
  description?: string | null;
  items?: TPlaylistItem[];
  viewpointItems?: TViewpointItem[];
}
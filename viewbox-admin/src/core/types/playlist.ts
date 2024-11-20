import { TPlaylistItem } from './playlist-item';
import { TViewpoint } from './viewpoint';

export type TPlaylist = {
  id: number;
  name: string;
  description: string | null;
  items: TPlaylistItem[];
  viewpoints: TViewpoint[];
}
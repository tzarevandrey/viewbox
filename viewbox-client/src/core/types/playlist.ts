import { TPlaylistItem } from './playlist-item';

export type TPlaylist = {
  id: number;
  name: string;
  description: string | null;
  items: TPlaylistItem[];
}
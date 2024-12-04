import { PlaylistItem } from '../playlists.items.model';

export class PlaylistGetDto {
  id: number;
  name: string;
  description: string | null;
  items: PlaylistItem[];
  viewpoints: {
    id: number;
    name: string;
  }[];
}
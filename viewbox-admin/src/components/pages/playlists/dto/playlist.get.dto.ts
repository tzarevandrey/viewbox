import { TPlaylistItem } from '../../../../core/types/playlist-item';

export type TPlaylistGetDto = {
  id: number;
  name: string;
  description: string | null;
  items: TPlaylistItem[];
  viewpoints: {
    id: number;
    name: string;
  }[];
}
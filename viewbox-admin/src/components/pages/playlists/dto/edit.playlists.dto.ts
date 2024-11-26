import { TCreatePlaylistItemDto } from './create.playlists.dto';

export type TEditPlaylistDto = {
  id: number;
  name: string;
  description: string | null;
  items: TCreatePlaylistItemDto[];
}
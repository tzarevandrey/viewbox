import { PlaylistItemCreateDto } from './playlist-items.create.dto';

export class PlaylistCreateDto {
  name: string;
  description?: string;
  items?: PlaylistItemCreateDto[];
}
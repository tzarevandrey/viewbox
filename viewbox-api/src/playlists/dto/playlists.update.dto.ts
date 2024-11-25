import { PlaylistItemCreateDto } from './playlist-items.create.dto';

export class PlaylistUpdateDto {
  id: number;
  name: string;
  description?: string;
  items?: PlaylistItemCreateDto[];
}
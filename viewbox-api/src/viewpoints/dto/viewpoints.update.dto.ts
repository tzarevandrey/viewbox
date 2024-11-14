export class ViewpointUpdateDto {
  id: number;
  name: string;
  description: string | null = null;
  playlistId: number | null = null;
}
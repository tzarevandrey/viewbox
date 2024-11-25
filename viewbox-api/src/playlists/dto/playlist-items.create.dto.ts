export class PlaylistItemCreateDto {
  contentItemId: number;
  startDate: Date | null;
  expireDate: Date | null;
  duration: number | null;
  position: number;
}
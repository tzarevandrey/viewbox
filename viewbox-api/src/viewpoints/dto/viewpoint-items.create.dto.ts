export class VewpointItemCreateDto {
  playlistId: number;
  startDate: Date | null;
  expireDate: Date | null;
  isDefault: boolean;
}
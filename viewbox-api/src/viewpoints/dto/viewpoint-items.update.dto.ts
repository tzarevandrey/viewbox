export class VewpointItemUpdateDto {
  id: number;
  playlistId: number;
  startDate: Date | null;
  expireDate: Date | null;
  isDefault: boolean;
}
export type TEditViewpointDto = {
  actual: {
    id: number;
    name: string;
    description: string | null;
    playlistId: number | null;
  },
  oldPlaylistId: number | null;
}
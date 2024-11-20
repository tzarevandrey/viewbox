import { TContent } from './content'

export type TPlaylistItem = {
  contentItem: TContent;
  position: number;
  duration: number | null;
  startDate: Date | null;
  expireDate: Date | null;
}
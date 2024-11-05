import { TPlaylist } from "./playlist";

export type TViewpoint = {
  id: number;
  name: string;
  description?: string;
  playlist?: TPlaylist;
}
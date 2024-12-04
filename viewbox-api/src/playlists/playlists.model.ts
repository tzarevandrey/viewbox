import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PlaylistItem } from "./playlists.items.model";
import { ViewpointItem } from 'src/viewpoints/viewpoints.items.model';

@Table({ tableName: 'playlists', createdAt: false, updatedAt: false, deletedAt: false })
export class Playlist extends Model<Playlist> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string | null;

  @HasMany(() => PlaylistItem)
  items: PlaylistItem[];

  @HasMany(() => ViewpointItem)
  viewpointItems: ViewpointItem[];

}
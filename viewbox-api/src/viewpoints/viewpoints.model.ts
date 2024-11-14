import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Playlist } from "src/playlists/playlists.model";

interface ViewpointCreationAttr {
  name: string;
  description: string | null;
  playlistId: number | null;
}

@Table({ tableName: 'viewpoints', paranoid: true, createdAt: false, updatedAt: false })
export class Viewpoint extends Model<Viewpoint, ViewpointCreationAttr> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @ForeignKey(() => Playlist)
  playlistId: number | null;

  @BelongsTo(() => Playlist, 'playlistId')
  playlist: Playlist;

}
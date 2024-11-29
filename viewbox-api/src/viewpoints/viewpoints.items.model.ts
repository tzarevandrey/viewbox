import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Viewpoint } from './viewpoints.model';
import { Playlist } from 'src/playlists/playlists.model';

interface ViewpointItemCreationAttr {
  playlistId: number;
  viewpointId: number;
  startDate: Date | null;
  expireDate: Date | null;
  isDefautl: boolean;
}

@Table({ tableName: 'viewpoints_items', createdAt: false, updatedAt: false, deletedAt: false })
export class ViewpointItem extends Model<ViewpointItem, ViewpointItemCreationAttr> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Viewpoint)
  viewpointId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Playlist)
  playlistId: number;

  @BelongsTo(() => Viewpoint, 'viewpointId')
  viewpoint: Viewpoint;

  @BelongsTo(() => Playlist, 'playlistId')
  playlist: Playlist;

  @Column({ type: DataType.DATE, allowNull: true })
  startDate: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  expireDate: Date | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  isDefault: boolean;

}
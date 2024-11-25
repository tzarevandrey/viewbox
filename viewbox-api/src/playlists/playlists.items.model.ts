import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Playlist } from "./playlists.model";
import { ContentItem } from "src/content-items/content-items.model";

interface PlaylistItemCreationAttr {
  playlistId: number;
  contentItenId: number;
  position: number;
  duration: number | null;
  startDate: Date | null;
  expireDate: Date | null;
}

@Table({ tableName: 'playlists_items', createdAt: false, updatedAt: false, deletedAt: false })
export class PlaylistItem extends Model<PlaylistItem, PlaylistItemCreationAttr> {

  @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true })
  @ForeignKey(() => Playlist)
  playlistId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => ContentItem)
  contentItemId: number;

  @BelongsTo(() => ContentItem, 'contentItemId')
  contentItem: ContentItem;

  @BelongsTo(() => Playlist, 'playlistId')
  playlist: Playlist;

  @Column({ type: DataType.SMALLINT, allowNull: false, primaryKey: true })
  position: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  duration: number | null;

  @Column({ type: DataType.DATE, allowNull: true })
  startDate: Date | null;

  @Column({ type: DataType.DATE, allowNull: true })
  expireDate: Date | null;

}
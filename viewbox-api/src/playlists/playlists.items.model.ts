import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Playlist } from "./playlists.model";
import { ContentItem } from "src/content-items/content-items.model";

@Table({tableName: 'playlists_items', createdAt: false, updatedAt: false, deletedAt: false})
export class PlaylistItem extends Model<PlaylistItem> {

    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true})
    @ForeignKey(() => Playlist)
    playlistId: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => ContentItem)
    contentItemId: number;

    @BelongsTo(() => ContentItem, 'contentItemId')
    contentItem: ContentItem;

    @Column({type: DataType.SMALLINT, allowNull: false, primaryKey: true})
    position: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    duration: number | null;

    @Column({type: DataType.DATE, allowNull: true})
    startDate: Date | null;

    @Column({type: DataType.DATE, allowNull: true})
    expireDate: Date | null;    

}
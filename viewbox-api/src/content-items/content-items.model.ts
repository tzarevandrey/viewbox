import { BelongsToMany, Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { ContentType } from "src/core/enums/content-types.enum";
import { ImageItem } from "./image-items.model";
import { VideoItem } from "./video-items.model";
import { WebpageItem } from "./webpage-items.model";
import { Playlist } from "src/playlists/playlists.model";
import { PlaylistItem } from "src/playlists/playlists.items.model";

@Table({tableName: 'content_items', createdAt: false, updatedAt: false, deletedAt: false})
export class ContentItem extends Model<ContentItem> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.SMALLINT, allowNull: false})
    contentType: ContentType;

    @Column({type: DataType.TEXT, allowNull: true})
    description: string | null;

    @HasOne(() => ImageItem)
    imageItem: ImageItem;

    @HasOne(() => VideoItem)
    videoItem: VideoItem;

    @HasOne(() => WebpageItem)
    webpageItem: WebpageItem;

    @BelongsToMany(() => Playlist, () => PlaylistItem)
    playlists: Playlist[];

}
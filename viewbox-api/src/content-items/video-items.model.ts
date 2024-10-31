import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ContentItem } from "./content-items.model";

@Table({tableName: 'video_items',paranoid: true, createdAt: false, updatedAt: false})
export class VideoItem extends Model<VideoItem> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    originalName: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => ContentItem)
    contentItemId: number;

    @BelongsTo(() => ContentItem, 'contentItemId')
    contentItem: ContentItem;

}
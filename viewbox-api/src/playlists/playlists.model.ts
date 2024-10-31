import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Viewpoint } from "src/viewpoints/viewpoints.model";
import { PlaylistItem } from "./playlists.items.model";

interface PlaylistCreationAttr {
    name: string;
    description?: string;
}

@Table({tableName: 'playlists', paranoid: true, createdAt: false, updatedAt: false})
export class Playlist extends Model<Playlist, PlaylistCreationAttr> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: true})
    description: string | null;

    @HasMany(() => Viewpoint)
    viewpoints: Viewpoint[];

    @HasMany(() => PlaylistItem)
    items: PlaylistItem[];

}
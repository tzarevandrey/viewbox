import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ViewpointItem } from './viewpoints.items.model';

interface ViewpointCreationAttr {
  name: string;
  description?: string;
}

@Table({ tableName: 'viewpoints', createdAt: false, updatedAt: false, deletedAt: false })
export class Viewpoint extends Model<Viewpoint, ViewpointCreationAttr> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string | null;

  @HasMany(() => ViewpointItem)
  items: ViewpointItem[];

}
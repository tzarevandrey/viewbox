import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { GroupRole } from "./groups.roles.model";
import { Role } from 'src/core/enums/roles.enum';

interface GroupCreationAttr {
  name: string;
  description?: string | null;
}

@Table({ tableName: 'groups', createdAt: false, updatedAt: false, deletedAt: false })
export class Group extends Model<Group, GroupCreationAttr> {

  @Column({ type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  description: string | null;

  @HasMany(() => GroupRole)
  roles: GroupRole[];

}
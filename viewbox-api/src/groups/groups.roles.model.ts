import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Group } from "./groups.model";
import { Role } from "src/core/enums/roles.enum";

@Table({tableName: 'groups_roles', createdAt: false, updatedAt: false, deletedAt: false})
export class GroupRole extends Model<GroupRole> {

    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true})
    @ForeignKey(() => Group)
    groupId: number;

    @BelongsTo(() => Group, 'groupId')
    group: Group;

    @Column({type: DataType.SMALLINT, allowNull: false, primaryKey: true})
    role: Role;

    @Column({type: DataType.DATE, allowNull: true})
    startDate: Date | null;

    @Column({type: DataType.DATE, allowNull: true})
    expireDate: Date | null;  

}

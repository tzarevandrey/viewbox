import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Journal } from "./journals.model";
import { EntityField } from "src/core/enums/event.entities-fields.enum";

@Table({tableName: 'journals_details', createdAt: false, updatedAt: false, deletedAt: false})
export class JournalDetail extends Model<JournalDetail> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    @ForeignKey(() => Journal)
    journalId: number;

    @BelongsTo(() => Journal, 'journalId')
    journal: Journal;

    @Column({type: DataType.STRING, allowNull: true})
    prevValue: string | null;

    @Column({type: DataType.STRING, allowNull: true})
    actualValue: string | null;

    @Column({type: DataType.SMALLINT, allowNull: false})
    entityField: EntityField;

}
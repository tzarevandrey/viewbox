import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { EventType } from "src/core/enums/event-types.enum";
import { JournalDetail } from "./journals.details.model";
import { EventEntity } from "src/core/enums/event-entities.enum";

interface JournalCreationAttr {
    eventType: EventType;
    authorLogin: string;
    authorName?: string;    
}

@Table({tableName: 'journals', createdAt: false, updatedAt: false, deletedAt: false})
export class Journal extends Model<Journal, JournalCreationAttr> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @Column({type: DataType.SMALLINT, allowNull: false})
    eventType: EventType;

    @Column({type: DataType.DATE, allowNull: false})
    date: Date;

    @Column({type: DataType.STRING, allowNull: false})
    authorLogin: string;

    @Column({type: DataType.STRING, allowNull: true})
    authorName: string | null;

    @HasMany(() => JournalDetail)
    details: JournalDetail[];

    @Column({type: DataType.SMALLINT, allowNull: false})
    eventEntity: EventEntity;

}
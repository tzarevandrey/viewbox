import { EventEntity } from "src/core/enums/event-entities.enum";
import { EventType } from "src/core/enums/event-types.enum";
import { JournalDetailCreateDto } from "./journals.details.create.dto";

export class JournalCreateDto {
    eventType: EventType;
    eventEntity: EventEntity;
    authorLogin: string;
    authorName?: string;
    details: JournalDetailCreateDto[];
}
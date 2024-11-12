import { EventEntity } from "src/core/enums/event-entities.enum";
import { EventType } from "src/core/enums/event-types.enum";

export class JournalCreateDto {
  eventType: EventType;
  eventEntity: EventEntity;
  entityName?: string | null;
  entity: any;
}
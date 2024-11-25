import { EventEntity } from '../enums/event-entities.enum';
import { EventType } from '../enums/event-types.enum';

export type TJournalWithCount = {
  total: number;
  data: TJournal[];
}

export type TJournal = {
  id: number;
  eventType: EventType;
  eventEntity: EventEntity;
  entityName: string;
  date: Date;
  authorName: string;
}
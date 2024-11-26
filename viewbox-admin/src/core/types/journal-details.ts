import { EntityField } from '../enums/entities-fields.enum';

export type TJournalDetails = {
  prevValue: string | null;
  actualValue: string | null;
  entityField: EntityField;
}
import { EntityField } from "src/core/enums/event.entities-fields.enum";

export class JournalDetailCreateDto {
    entityField: EntityField;
    prevValue?: string;
    actualValue?: string;
}
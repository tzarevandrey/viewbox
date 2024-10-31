import { ContentType } from "src/core/enums/content-types.enum";

export class ContentItemCreateDto {
    contentType: ContentType;
    description?: string;
    itemName?: string;
}
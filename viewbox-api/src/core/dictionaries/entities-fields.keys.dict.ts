import { EntityField } from '../enums/entities-fields.enum'
import { EventEntity } from '../enums/event-entities.enum'

export const ENTITIES_FIELDS_KEYS: {
  [key: string]: {
    [key: string]: EntityField
  }
} = {
  [EventEntity.Viewpoint]: {
    'name': EntityField.ViewpointName,
    'id': EntityField.ViewpointId,
    'description': EntityField.ViewpointDescription,
    'playlistId': EntityField.ViewpointPlaylistId,
    'deletedAt': EntityField.ViewpointDeletedAt,
  }
}
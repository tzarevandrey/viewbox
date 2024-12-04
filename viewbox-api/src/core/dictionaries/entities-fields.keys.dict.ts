import { EntityField } from '../enums/entities-fields.enum'
import { EventEntity } from '../enums/event-entities.enum'

export const ENTITIES_FIELDS_KEYS: {
  [key: string]: {
    [key: string]: EntityField
  }
} = {
  [EventEntity.Playlist]: {
    'id': EntityField.PlaylistId,
    'name': EntityField.PlaylistName,
    'description': EntityField.PlaylistDescription,
    'deletedAt': EntityField.PlaylistDeletedAt,
  },
  [EventEntity.PlaylistItem]: {
    'id': EntityField.PlaylistItemId,
    'playlistId': EntityField.PlaylistItemPlaylistId,
    'contentItemId': EntityField.PlaylistItemContentItemId,
    'position': EntityField.PlaylistItemPosition,
    'duration': EntityField.PlaylistItemDuration,
    'startDate': EntityField.PlaylistItemStartDate,
    'expireDate': EntityField.PlaylistItemExpireDate,
  },
  [EventEntity.Group]: {
    'id': EntityField.GroupId,
    'name': EntityField.GroupName,
    'description': EntityField.GroupDescription,
  },
  [EventEntity.GroupRole]: {
    'groupId': EntityField.GroupRoleGroupId,
    'role': EntityField.GroupRoleRole,
    'startDate': EntityField.GroupRoleStartDate,
    'expireDate': EntityField.GroupRoleExpireDate,
  },
  [EventEntity.ContentItem]: {
    'id': EntityField.ContentItemId,
    'name': EntityField.ContentItemName,
    'contentType': EntityField.ContentItemContentType,
    'lastUpdated': EntityField.ContentItemLastUpdated,
    'description': EntityField.ContentItemDescription,
  },
  [EventEntity.ContentImage]: {
    'id': EntityField.ContentImageId,
    'originalName': EntityField.ContentImageOriginalName,
    'contentItemId': EntityField.ContentImageContentItemId,
    'deletedAt': EntityField.ContentImageDeletedAt,
  },
  [EventEntity.ContentVideo]: {
    'id': EntityField.ContentVideoId,
    'originalName': EntityField.ContentVideoOriginalName,
    'contentItemId': EntityField.ContentVideoContentItemId,
    'deletedAt': EntityField.ContentVideoDeletedAt,
  },
  [EventEntity.ContentWebpage]: {
    'id': EntityField.ContentWebpageId,
    'contentItemId': EntityField.ContentWebpageContentItemId,
    'deletedAt': EntityField.ContentWebpageDeletedAt,
  },
  [EventEntity.Viewpoint]: {
    'id': EntityField.ViewpointId,
    'name': EntityField.ViewpointName,
    'description': EntityField.ViewpointDescription,
  },
  [EventEntity.ViewpointItem]: {
    'viewpointId': EntityField.ViewpointItemViewpointId,
    'playlistId': EntityField.ViewpointItemPlaylistId,
    'startDate': EntityField.ViewpointItemStartDate,
    'expireDate': EntityField.ViewpointItemExpireDate,
    'isDefault': EntityField.ViewpointItemIsDefault,
    'id': EntityField.ViewpointItemId,
  }
}
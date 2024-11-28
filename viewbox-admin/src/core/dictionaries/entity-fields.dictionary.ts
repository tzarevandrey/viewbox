import { EntityField } from '../enums/entities-fields.enum';

export const ENTITY_FIELDS_NAMES: {
  [key: string]: string;
} = {
  [EntityField.PlaylistId]: 'Идентификатор',
  [EntityField.PlaylistName]: 'Имя',
  [EntityField.PlaylistDescription]: 'Описание',
  [EntityField.PlaylistDeletedAt]: 'Дата удаления',
  [EntityField.PlaylistItemPlaylistId]: 'Идентификатор списка воспроизведения',
  [EntityField.PlaylistItemContentItemId]: 'Идентификатор контента',
  [EntityField.PlaylistItemPosition]: 'Позиция в списке',
  [EntityField.PlaylistItemDuration]: 'Продолжительность',
  [EntityField.PlaylistItemStartDate]: 'Дата начала воспроизведения',
  [EntityField.PlaylistItemExpireDate]: 'Дата прекращения воспроизведения',
  [EntityField.GroupId]: 'Идентификатор',
  [EntityField.GroupName]: 'Имя',
  [EntityField.GroupDescription]: 'Описание',
  [EntityField.GroupRoleGroupId]: 'Идентификатор группы доступа',
  [EntityField.GroupRoleRole]: 'Роль',
  [EntityField.ContentItemId]: 'Идентификатор',
  [EntityField.ContentItemName]: 'Имя сохранённого файла или ссылка',
  [EntityField.ContentItemContentType]: 'Тип контента',
  [EntityField.ContentItemLastUpdated]: 'Дата последнего изменения',
  [EntityField.ContentItemDescription]: 'Описание',
  [EntityField.ContentImageId]: 'Идентификатор',
  [EntityField.ContentImageOriginalName]: 'Оригинальное имя файла',
  [EntityField.ContentImageContentItemId]: 'Идентификатор контента',
  [EntityField.ContentImageDeletedAt]: 'Дата удаления',
  [EntityField.ContentVideoId]: 'Идентификатор',
  [EntityField.ContentVideoOriginalName]: 'Оригинальное имя файла',
  [EntityField.ContentVideoContentItemId]: 'Идентификатор контента',
  [EntityField.ContentVideoDeletedAt]: 'Дата удаления',
  [EntityField.ContentWebpageId]: 'Идентификатор',
  [EntityField.ContentWebpageContentItemId]: 'Идентификатор контента',
  [EntityField.ContentWebpageDeletedAt]: 'Дата удаления',
  [EntityField.ViewpointId]: 'Идентификатор',
  [EntityField.ViewpointName]: 'Имя',
  [EntityField.ViewpointDescription]: 'Описание',
  [EntityField.ViewpointItemPlaylistId]: 'Идентификатор списка воспроизведения',
  [EntityField.ViewpointItemViewpointId]: 'Иденетификатор панели воспроизведения',
  [EntityField.ViewpointItemStartDate]: 'Дата начала использования списка воспроизведения',
  [EntityField.ViewpointItemExpireDate]: 'Дата прекращения использования списка воспроизведения',
  [EntityField.ViewpointItemIsDefault]: 'Признак списка воспроизведения по умолчанию',
}
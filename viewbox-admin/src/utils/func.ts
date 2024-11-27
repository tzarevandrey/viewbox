import { ReactNode } from 'react';
import { EntityField } from '../core/enums/entities-fields.enum';
import moment from 'moment';
import { Role } from '../core/enums/roles.enum';
import { ContentType } from '../core/enums/content.enum';

export function getEnumNames(e: any) {
  return Object.keys(e)
    .map(k => e[k])
    .filter(v => typeof v === 'number')
    .map(x => String(x));
}

export function getEnumValues<T extends number>(e: any) {
  return Object.keys(e)
    .map(k => e[k])
    .filter(v => typeof v === 'number') as T[];
}

export function getJournalDetailValue(val: string | null, field: EntityField): ReactNode {

  if (val === null || val === '' || val.toLowerCase() === 'null') return '';

  const dateFormat = 'DD.MM.YYYY HH:mm'

  switch (field) {
    case EntityField.PlaylistId: return val;
    case EntityField.PlaylistName: return val;
    case EntityField.PlaylistDescription: return val;
    case EntityField.PlaylistDeletedAt: return moment(val).format(dateFormat);
    case EntityField.PlaylistItemPlaylistId: return val;
    case EntityField.PlaylistItemContentItemId: return val;
    case EntityField.PlaylistItemPosition: return val;
    case EntityField.PlaylistItemDuration: return val;
    case EntityField.PlaylistItemStartDate: return moment(val).format(dateFormat);
    case EntityField.PlaylistItemExpireDate: return moment(val).format(dateFormat);
    case EntityField.GroupId: return val;
    case EntityField.GroupName: return val;
    case EntityField.GroupDescription: return val;
    case EntityField.GroupRoleGroupId: return val;
    case EntityField.GroupRoleRole: switch (+val) {
      case Role.Administrator: return 'Администраторы';
      case Role.Support: return 'Сопровождение';
      case Role.Viewpoint: return 'Воспроизведение';
    };
      break;
    case EntityField.GroupRoleStartDate: return moment(val).format(dateFormat);
    case EntityField.GroupRoleExpireDate: return moment(val).format(dateFormat);
    case EntityField.ContentItemId: return val;
    case EntityField.ContentItemName: return val;
    case EntityField.ContentItemContentType: switch (+val) {
      case ContentType.Picture: return 'Изображение';
      case ContentType.Video: return 'Видео';
      case ContentType.WebPage: return 'Веб-страница';
    };
      break;
    case EntityField.ContentItemLastUpdated: return moment(val).format(dateFormat);
    case EntityField.ContentItemDescription: return val;
    case EntityField.ContentImageId: return val;
    case EntityField.ContentImageOriginalName: return val;
    case EntityField.ContentImageContentItemId: return val;
    case EntityField.ContentImageDeletedAt: return moment(val).format(dateFormat);
    case EntityField.ContentVideoId: return val;
    case EntityField.ContentVideoOriginalName: return val;
    case EntityField.ContentVideoContentItemId: return val;
    case EntityField.ContentVideoDeletedAt: return moment(val).format(dateFormat);
    case EntityField.ContentWebpageId: return val;
    case EntityField.ContentWebpageContentItemId: return val;
    case EntityField.ContentWebpageDeletedAt: return moment(val).format(dateFormat);
  }
}
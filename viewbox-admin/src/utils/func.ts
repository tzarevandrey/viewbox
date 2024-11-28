import { ReactNode } from 'react';
import { EntityField } from '../core/enums/entities-fields.enum';
import moment from 'moment';
import { Role } from '../core/enums/roles.enum';
import { ContentType } from '../core/enums/content.enum';
import { TContent } from '../core/types/content';
import { COLORS } from '../core/constants/colors';
import { Page } from '../core/enums/pages.enum';
import { Functional } from '../core/enums/functional.enum';
import { PAGES_CONFIG } from '../core/dictionaries/pages.config.dictionary';
import { EventType } from '../core/enums/event-types.enum';

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

export function getContentName(content: TContent): string {
  let name = content.name;
  switch (content.contentType) {
    case ContentType.Picture: name = content.imageItem?.originalName ?? name;
      break;
    case ContentType.Video: name = content.videoItem?.originalName ?? name;
      break;
  }
  return name;
}

export function getContentColor(content: TContent): string {
  let color = '';
  switch (content.contentType) {
    case ContentType.Picture: color = COLORS.CONTENT_IMAGE;
      break;
    case ContentType.Video: color = COLORS.CONTENT_VIDEO;
      break;
    case ContentType.WebPage: color = COLORS.CONTENT_WEB_PAGE;
      break;
  }
  return color;
}

export function getPageLink(page: Page, functional: Functional): (string | undefined) {
  return PAGES_CONFIG[page].functionals?.find(x => +Object.keys(x)[0] === functional)?.value.link;
}

export function getContentTypeName(contentType: ContentType | undefined): string {
  let name = 'Неопределённый контент';
  switch (contentType) {
    case ContentType.Picture: name = 'Изображение';
      break;
    case ContentType.Video: name = 'Видео';
      break;
    case ContentType.WebPage: name = 'Веб-страница';
      break;
  }
  return name;
}

export function getRoleName(role: Role): string {
  let name = '';
  switch (role) {
    case Role.Administrator: name = 'Администраторы';
      break;
    case Role.Support: name = 'Сопровождение';
      break;
    case Role.Viewpoint: name = 'Воспроизведение';
      break;
  }
  return name;
}

export function getRoleColor(role: Role): string {
  let color = '';
  switch (role) {
    case Role.Administrator: color = COLORS.ROLE_ADMINISTRATOR;
      break;
    case Role.Support: color = COLORS.ROLE_SUPPORT;
      break;
    case Role.Viewpoint: color = COLORS.ROLE_VIEWPOINT;
      break;
  }
  return color;
}

export function getEventColor(e: EventType): string {
  let color = '';
  switch (e) {
    case EventType.Create: color = COLORS.EVENT_CREATE;
      break;
    case EventType.Update: color = COLORS.EVENT_UPDATE;
      break;
    case EventType.Delete: color = COLORS.EVENT_DELETE;
      break;
    case EventType.Link: color = COLORS.EVENT_LINK;
      break;
    case EventType.Unlink: color = COLORS.EVENT_UNLINK;
      break;
  }
  return color;
}

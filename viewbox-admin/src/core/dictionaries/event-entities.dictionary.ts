import { EventEntity } from '../enums/event-entities.enum';

export const EVENT_ENTITY_NAMES: {
  [key: string]: string;
} = {
  [EventEntity.ContentImage]: 'Изображение',
  [EventEntity.ContentItem]: 'Контент',
  [EventEntity.ContentVideo]: 'Видео',
  [EventEntity.ContentWebpage]: 'Веб-страница',
  [EventEntity.Group]: 'Группа доступа',
  [EventEntity.GroupRole]: 'Роль',
  [EventEntity.Playlist]: 'Список воспроизведения',
  [EventEntity.PlaylistItem]: 'Элемент списка воспроизведения',
}
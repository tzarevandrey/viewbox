import { EventType } from '../enums/event-types.enum';

export const EVENT_TYPE_NAMES: {
  [key: string]: string;
} = {
  [EventType.Create]: 'Создание',
  [EventType.Delete]: 'Удаление',
  [EventType.Link]: 'Добавление элемента',
  [EventType.Unlink]: 'Удаление элемента',
  [EventType.Update]: 'Изменение',
}
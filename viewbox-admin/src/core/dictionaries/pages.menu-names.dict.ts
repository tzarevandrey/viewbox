import { Page } from '../enums/pages.enum';

export const PAGES_MENU_NAMES: { page: Page, name: string, order: number }[] = [
  {
    page: Page.Viewpoints, name: 'Панели воспроизведения', order: 10
  },
  {
    page: Page.Playlists, name: 'Списки воспроизведения', order: 20
  },
  {
    page: Page.Contents, name: 'Контент', order: 30
  },
  {
    page: Page.Groups, name: 'Группы доступа', order: 40
  },
  {
    page: Page.Journal, name: 'Журнал событий', order: 50
  },
]
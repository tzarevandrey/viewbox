import { FC } from 'react';
import { Content } from '../../components/pages/contents/content.page';
import { Contents } from '../../components/pages/contents/contents.page';
import { Group } from '../../components/pages/groups/group.page';
import { Groups } from '../../components/pages/groups/groups.page';
import { Journal } from '../../components/pages/journal/journal.page';
import { Playlist } from '../../components/pages/playlists/playlist.page';
import { Playlists } from '../../components/pages/playlists/playlists.page';
import { Functional } from '../enums/functional.enum';
import { Page } from '../enums/pages.enum';
import { ContentCreate } from '../../components/pages/contents/content.create.page';
import { ContentEdit } from '../../components/pages/contents/content.edit.page';
import { GroupCreate } from '../../components/pages/groups/groups.create.page';
import { GroupEdit } from '../../components/pages/groups/group.edit.page';
import { PlaylistCreate } from '../../components/pages/playlists/playlist.create.page';
import { PlaylistEdit } from '../../components/pages/playlists/playlist.edit.page';
import { Manual } from '../../components/pages/manual/manual.page';
import { Viewpoints } from '../../components/pages/viewpoints/viewpoints.page';
import { ViewpointCreate } from '../../components/pages/viewpoints/viewpoint.create.page';
import { Viewpoint } from '../../components/pages/viewpoints/viewpoint.page';
import { ViewpointEdit } from '../../components/pages/viewpoints/viewpoint.edit.page';

export const PAGES_CONFIG: {
  [key: string]: {
    mainMenuName: string;
    link: string;
    Jsx: FC;
    order: number;
    functionals?: {
      [key: string]: {
        link: string;
        Jsx: FC;
      };
    }[]
  }
} = {
  [Page.Playlists]: {
    mainMenuName: 'Списки воспроизведения',
    link: '/playlists',
    Jsx: Playlists,
    order: 20,
    functionals: [
      {
        [Functional.Create]: { link: '/playlists/new', Jsx: PlaylistCreate }
      },
      {
        [Functional.Read]: { link: '/playlists/:id', Jsx: Playlist }
      },
      {
        [Functional.Update]: { link: '/playlists/edit/:id', Jsx: PlaylistEdit }
      }
    ]
  },
  [Page.Contents]: {
    mainMenuName: 'Контент',
    link: '/content',
    Jsx: Contents,
    order: 30,
    functionals: [
      {
        [Functional.Create]: { link: '/content/new', Jsx: ContentCreate }
      },
      {
        [Functional.Read]: { link: '/content/:id', Jsx: Content }
      },
      {
        [Functional.Update]: { link: '/content/edit/:id', Jsx: ContentEdit }
      }
    ]
  },
  [Page.Groups]: {
    mainMenuName: 'Группы доступа',
    link: '/groups',
    Jsx: Groups,
    order: 40,
    functionals: [
      {
        [Functional.Create]: { link: '/groups/new', Jsx: GroupCreate }
      },
      {
        [Functional.Read]: { link: '/groups/:id', Jsx: Group }
      },
      {
        [Functional.Update]: { link: '/groups/edit/:id', Jsx: GroupEdit }
      }
    ]
  },
  [Page.Journal]: {
    mainMenuName: 'Журнал событий',
    link: '/journal',
    Jsx: Journal,
    order: 50,
    functionals: [
      {
        [Functional.Read]: { link: '/journal/:id', Jsx: Group }
      }
    ]
  },
  [Page.Manual]: {
    mainMenuName: 'Руководство пользователя',
    link: '/manual',
    Jsx: Manual,
    order: 60
  },
  [Page.Viewpoints]: {
    mainMenuName: 'Панели воспроизведения',
    link: '/viwpoints',
    Jsx: Viewpoints,
    order: 10,
    functionals: [
      {
        [Functional.Create]: { link: '/viwpoints/new', Jsx: ViewpointCreate }
      },
      {
        [Functional.Read]: { link: '/viwpoints/:id', Jsx: Viewpoint }
      },
      {
        [Functional.Update]: { link: '/viwpoints/edit/:id', Jsx: ViewpointEdit }
      }
    ]
  },
}
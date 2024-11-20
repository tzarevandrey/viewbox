import { FC } from 'react';
import { Content } from '../../components/pages/contents/content.page';
import { Contents } from '../../components/pages/contents/contents.page';
import { Group } from '../../components/pages/groups/group.page';
import { Groups } from '../../components/pages/groups/groups.page';
import { JournalDetails } from '../../components/pages/journal/journal-details.page';
import { Journal } from '../../components/pages/journal/journal.page';
import { Playlist } from '../../components/pages/playlists/playlist.page';
import { Playlists } from '../../components/pages/playlists/playlists.page';
import { Viewpoint } from '../../components/pages/viewpoints/viewpoint.page';
import { Viewpoints } from '../../components/pages/viewpoints/viewpoints.page';
import { Functional } from '../enums/functional.enum';
import { Page } from '../enums/pages.enum';
import { Role } from '../enums/roles.enum';
import { ViewpointCreate } from '../../components/pages/viewpoints/viewpoint.create.page';
import { ViewpointEdit } from '../../components/pages/viewpoints/viewpoint.edit.page';
import { ContentCreate } from '../../components/pages/contents/content.create.page';
import { ContentEdit } from '../../components/pages/contents/content.edit.page';
import { GroupCreate } from '../../components/pages/groups/groups.create.page';
import { GroupEdit } from '../../components/pages/groups/group.edit.page';

export const PAGES_CONFIG: {
  [key: string]: {
    name: string;
    link: string;
    Jsx: FC;
    order: number;
    roles: Role[];
    subpages: {
      link: string;
      Jsx: FC;
      roles: Role[];
      functionals: Functional[];
    }[];
    functionals: {
      [key: string]: Role[];
    }
  }
} = {
  [Page.Viewpoints]: {
    name: 'Панели воспроизведения',
    link: '/viewpoints',
    Jsx: Viewpoints,
    order: 10,
    roles: [Role.Administrator, Role.Superuser, Role.Support],
    subpages: [
      {
        link: '/viewpoints/new',
        Jsx: ViewpointCreate,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Create]
      },
      {
        link: '/viewpoints/:id',
        Jsx: Viewpoint,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Read]
      },
      {
        link: '/viewpoints/edit/:id',
        Jsx: ViewpointEdit,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Update]
      },
    ],
    functionals: {
      [Functional.Create]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Read]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Update]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Delete]: [Role.Administrator, Role.Superuser, Role.Support],
    }
  },
  [Page.Playlists]: {
    name: 'Списки воспроизведения',
    link: '/playlists',
    Jsx: Playlists,
    order: 20,
    roles: [Role.Administrator, Role.Superuser, Role.Support],
    subpages: [
      {
        link: '/playlists/new',
        Jsx: Playlist,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Create]
      },
      {
        link: '/playlists/:id',
        Jsx: Playlist,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Read, Functional.Update]
      },
    ],
    functionals: {
      [Functional.Create]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Read]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Update]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Delete]: [Role.Administrator, Role.Superuser, Role.Support],
    }
  },
  [Page.Contents]: {
    name: 'Контент',
    link: '/content',
    Jsx: Contents,
    order: 30,
    roles: [Role.Administrator, Role.Superuser, Role.Support],
    subpages: [
      {
        link: '/content/new',
        Jsx: ContentCreate,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Create]
      },
      {
        link: '/content/:id',
        Jsx: Content,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Read]
      },
      {
        link: '/content/edit/:id',
        Jsx: ContentEdit,
        roles: [Role.Administrator, Role.Superuser, Role.Support],
        functionals: [Functional.Update]
      },
    ],
    functionals: {
      [Functional.Create]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Read]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Update]: [Role.Administrator, Role.Superuser, Role.Support],
      [Functional.Delete]: [Role.Administrator, Role.Superuser, Role.Support],
    }
  },
  [Page.Groups]: {
    name: 'Группы доступа',
    link: '/groups',
    Jsx: Groups,
    order: 40,
    roles: [Role.Superuser, Role.Support],
    subpages: [
      {
        link: '/groups/new',
        Jsx: GroupCreate,
        roles: [Role.Superuser, Role.Support],
        functionals: [Functional.Create]
      },
      {
        link: '/groups/:id',
        Jsx: Group,
        roles: [Role.Superuser, Role.Support],
        functionals: [Functional.Read]
      },
      {
        link: '/groups/edit/:id',
        Jsx: GroupEdit,
        roles: [Role.Superuser, Role.Support],
        functionals: [Functional.Update]
      },
    ],
    functionals: {
      [Functional.Create]: [Role.Superuser, Role.Support],
      [Functional.Read]: [Role.Superuser, Role.Support],
      [Functional.Update]: [Role.Superuser, Role.Support],
      [Functional.Delete]: [Role.Superuser, Role.Support],
    }
  },
  [Page.Journal]: {
    name: 'Журнал событий',
    link: '/journal',
    Jsx: Journal,
    order: 50,
    roles: [Role.Superuser, Role.Support],
    subpages: [
      {
        link: '/journal/:id',
        Jsx: JournalDetails,
        roles: [Role.Superuser, Role.Support],
        functionals: [Functional.Read]
      }
    ],
    functionals: {
      [Functional.Read]: [Role.Superuser, Role.Support],
    }
  }
}
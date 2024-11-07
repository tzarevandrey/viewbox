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
import { FunctionalPageType } from '../enums/functional-page.type.enum';
import { Functional } from '../enums/functional.enum';
import { Page } from '../enums/pages.enum';

export const PAGES_CONFIG = {
  [Page.Viewpoints]: {
    name: 'Панели воспроизведения',
    link: '/viewpoints',
    Jsx: Viewpoints,
    order: 10,
    functionals: {
      [FunctionalPageType.Subpage]: {
        [Functional.Create]: {
          link: '/viewpoints/new',
          Jsx: Viewpoint,
        },
        [Functional.Read]: {
          link: '/viewpoints/:id',
          Jsx: Viewpoint,
        },
      },
    }
  },
  [Page.Playlists]: {
    name: 'Списки воспроизведения',
    link: '/playlists',
    Jsx: Playlists,
    order: 20,
    functionals: {
      [FunctionalPageType.Subpage]: {
        [Functional.Create]: {
          link: '/playlists/new',
          Jsx: Playlist,
        },
        [Functional.Read]: {
          link: '/playlists/:id',
          Jsx: Playlist,
        },
      },
    }
  },
  [Page.Contents]: {
    name: 'Контент',
    link: '/content',
    Jsx: Contents,
    order: 30,
    functionals: {
      [FunctionalPageType.Subpage]: {
        [Functional.Create]: {
          link: '/content/new',
          Jsx: Content,
        },
        [Functional.Read]: {
          link: '/content/:id',
          Jsx: Content,
        },
      },
    }
  },
  [Page.Groups]: {
    name: 'Группы доступа',
    link: '/groups',
    Jsx: Groups,
    order: 40,
    functionals: {
      [FunctionalPageType.Subpage]: {
        [Functional.Create]: {
          link: '/groups/new',
          Jsx: Group,
        },
        [Functional.Read]: {
          link: '/groups/:id',
          Jsx: Group,
        },
      },
    }
  },
  [Page.Journal]: {
    name: 'Журнал событий',
    link: '/journal',
    Jsx: Journal,
    order: 50,
    functionals: {
      [FunctionalPageType.Subpage]: {
        [Functional.Read]: {
          link: '/journal/:id',
          Jsx: JournalDetails,
        },
      },
    }
  }
}
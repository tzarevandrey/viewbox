import { Functional } from '../enums/functional.enum';
import { Page } from '../enums/pages.enum';
import { Role } from '../enums/roles.enum';

export const ROLES_PAGES = {
  [Role.Administrator]: {
    [Page.Viewpoints]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Playlists]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Contents]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
  },
  [Role.Support]: {
    [Page.Viewpoints]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Playlists]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Contents]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Groups]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Journal]: [Functional.Read],
  },
  [Role.Superuser]: {
    [Page.Viewpoints]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Playlists]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Contents]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Groups]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Journal]: [Functional.Read],
  },
}

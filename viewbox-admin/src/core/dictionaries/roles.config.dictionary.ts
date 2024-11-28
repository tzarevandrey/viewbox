import { Functional } from '../enums/functional.enum';
import { Page } from '../enums/pages.enum';
import { Role } from '../enums/roles.enum';

export const ROLES_CONFIG: { [key: string]: { [key: string]: Functional[] } } = {
  [Role.Administrator]: {
    [Page.Contents]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Manual]: [Functional.Read],
    [Page.Playlists]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Viewpoints]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete]
  },
  [Role.Superuser]: {
    [Page.Contents]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Manual]: [Functional.Read],
    [Page.Playlists]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Viewpoints]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Groups]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Journal]: [Functional.Read]
  },
  [Role.Support]: {
    [Page.Contents]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Manual]: [Functional.Read],
    [Page.Playlists]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Viewpoints]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Groups]: [Functional.Create, Functional.Read, Functional.Update, Functional.Delete],
    [Page.Journal]: [Functional.Read]
  },
}
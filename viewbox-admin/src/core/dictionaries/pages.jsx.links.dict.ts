import { FC } from 'react';
import { Page } from '../enums/pages.enum';
import { Viewpoints } from '../../components/pages/viewpoints/viewpoints.page';
import { Playlists } from '../../components/pages/playlists/playlists.page';
import { Contents } from '../../components/pages/contents/contents.page';
import { Groups } from '../../components/pages/groups/groups.page';
import { Journal } from '../../components/pages/journal/journal.page';

export const PAGES_JSX_LINKS: { page: Page, Jsx: FC, link: string }[] = [
  {
    page: Page.Viewpoints, Jsx: Viewpoints, link: '/'
  },
  {
    page: Page.Playlists, Jsx: Playlists, link: '/playlists'
  },
  {
    page: Page.Contents, Jsx: Contents, link: '/contents'
  },
  {
    page: Page.Groups, Jsx: Groups, link: '/groups'
  },
  {
    page: Page.Journal, Jsx: Journal, link: '/journal'
  },
]
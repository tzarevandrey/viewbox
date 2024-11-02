import { FC } from 'react';
import { Subpage } from '../enums/subpages.enum';
import { Viewpoint } from '../../components/pages/viewpoints/viewpoint.page';
import { ViewpointEdit } from '../../components/pages/viewpoints/viewpoint.edit.page';
import { ViewpointCreate } from '../../components/pages/viewpoints/viewpoint.create.modal';
import { Playlist } from '../../components/pages/playlists/playlist.page';
import { PlaylistEdit } from '../../components/pages/playlists/playlist.edit.page';
import { PlaylistCreate } from '../../components/pages/playlists/playlist.create.page';
import { Content } from '../../components/pages/contents/content.page';
import { ContentEdit } from '../../components/pages/contents/content.edit.page';
import { Group } from '../../components/pages/groups/group.page';
import { GroupEdit } from '../../components/pages/groups/group.edit.page';
import { JournalDetails } from '../../components/pages/journal/journal-details.page';

export const SUBPAGES_JSX_LINKS: { page: Subpage, Jsx: FC, link: string }[] = [
  {
    page: Subpage.ViewpointView, Jsx: Viewpoint, link: ':id'
  },
  {
    page: Subpage.ViewpointEdit, Jsx: ViewpointEdit, link: 'edit/:id'
  },
  {
    page: Subpage.ViewpointCreate, Jsx: ViewpointCreate, link: 'create'
  },
  {
    page: Subpage.PlaylistView, Jsx: Playlist, link: ':id'
  },
  {
    page: Subpage.PlaylistEdit, Jsx: PlaylistEdit, link: 'edit/:id'
  },
  {
    page: Subpage.PlaylistCreate, Jsx: PlaylistCreate, link: 'create'
  },
  {
    page: Subpage.ContentView, Jsx: Content, link: ':id'
  },
  {
    page: Subpage.ContentEdit, Jsx: ContentEdit, link: 'edit/:id'
  },
  {
    page: Subpage.GroupView, Jsx: Group, link: ':id'
  },
  {
    page: Subpage.GroupEdit, Jsx: GroupEdit, link: 'edit/:id'
  },
  {
    page: Subpage.JournalDetails, Jsx: JournalDetails, link: ':id'
  },
]
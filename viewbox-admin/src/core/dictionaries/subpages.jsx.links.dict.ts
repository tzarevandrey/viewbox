import { FC } from 'react';
import { Subpage } from '../enums/subpages.enum';
import { Viewpoint } from '../../components/viewpoints/viewpoint.page';
import { ViewpointEdit } from '../../components/viewpoints/viewpoint.edit.page';
import { ViewpointCreate } from '../../components/viewpoints/viewpoint.create.page';
import { Playlist } from '../../components/playlists/playlist.page';
import { PlaylistEdit } from '../../components/playlists/playlist.edit.page';
import { PlaylistCreate } from '../../components/playlists/playlist.create.page';
import { Content } from '../../components/contents/content.page';
import { ContentEdit } from '../../components/contents/content.edit.page';
import { Group } from '../../components/groups/group.page';
import { GroupEdit } from '../../components/groups/group.edit.page';
import { JournalDetails } from '../../components/journal/journal-details.page';

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
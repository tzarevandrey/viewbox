import { FC } from "react";
import { Functional } from "../enums/functional.enum";
import { Page } from "../enums/pages.enum";
import { Viewpoint } from "../../components/pages/viewpoints/viewpoint.page";
import { ViewpointEdit } from "../../components/pages/viewpoints/viewpoint.edit.page";
import { Playlist } from "../../components/pages/playlists/playlist.page";
import { PlaylistEdit } from "../../components/pages/playlists/playlist.edit.page";
import { Content } from "../../components/pages/contents/content.page";
import { ContentEdit } from "../../components/pages/contents/content.edit.page";
import { Group } from "../../components/pages/groups/group.page";
import { GroupEdit } from "../../components/pages/groups/group.edit.page";
import { JournalDetails } from "../../components/pages/journal/journal-details.page";

export const PAGES_FUNCTIONAL_JSX: { page: Page, functionalPages: { functional: Functional, Jsx: FC }[] }[] = [
  {
    page: Page.Viewpoints,
    functionalPages: [
      {
        functional: Functional.Read,
        Jsx: Viewpoint
      },
      {
        functional: Functional.Update,
        Jsx: ViewpointEdit
      },
    ]
  },
  {
    page: Page.Playlists,
    functionalPages: [
      {
        functional: Functional.Read,
        Jsx: Playlist
      },
      {
        functional: Functional.Update,
        Jsx: PlaylistEdit
      },
    ]
  },
  {
    page: Page.Contents,
    functionalPages: [
      {
        functional: Functional.Read,
        Jsx: Content
      },
      {
        functional: Functional.Update,
        Jsx: ContentEdit
      },
    ]
  },
  {
    page: Page.Groups,
    functionalPages: [
      {
        functional: Functional.Read,
        Jsx: Group
      },
      {
        functional: Functional.Update,
        Jsx: GroupEdit
      },
    ]
  },
  {
    page: Page.Journal,
    functionalPages: [
      {
        functional: Functional.Read,
        Jsx: JournalDetails
      },
    ]
  },
]
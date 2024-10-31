import { Functional } from '../enums/functional.enum';
import { Page } from '../enums/pages.enum';
import { Role } from '../enums/roles.enum';
import { Subpage } from '../enums/subpages.enum';

export const ROLES_PAGES: { role: Role, pages: { page: Page, subpages?: Subpage[], functionals?: Functional[] }[] }[] = [
  {
    role: Role.Administrator,
    pages: [
      {
        page: Page.Viewpoints,
        subpages: [
          Subpage.ViewpointView,
          Subpage.ViewpointCreate,
          Subpage.ViewpointEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Playlists,
        subpages: [
          Subpage.PlaylistView,
          Subpage.PlaylistCreate,
          Subpage.PlaylistEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Contents,
        subpages: [
          Subpage.ContentView,
          Subpage.ContentEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
    ]

  },
  {
    role: Role.Support,
    pages: [
      {
        page: Page.Viewpoints,
        subpages: [
          Subpage.ViewpointView,
          Subpage.ViewpointCreate,
          Subpage.ViewpointEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Playlists,
        subpages: [
          Subpage.PlaylistView,
          Subpage.PlaylistCreate,
          Subpage.PlaylistEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Contents,
        subpages: [
          Subpage.ContentView,
          Subpage.ContentEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Groups,
        subpages: [
          Subpage.GroupView,
          Subpage.GroupEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Journal,
        subpages: [
          Subpage.JournalDetails,
        ]
      },
    ]
  },
  {
    role: Role.Superuser,
    pages: [
      {
        page: Page.Viewpoints,
        subpages: [
          Subpage.ViewpointView,
          Subpage.ViewpointCreate,
          Subpage.ViewpointEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Playlists,
        subpages: [
          Subpage.PlaylistView,
          Subpage.PlaylistCreate,
          Subpage.PlaylistEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Contents,
        subpages: [
          Subpage.ContentView,
          Subpage.ContentEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Groups,
        subpages: [
          Subpage.GroupView,
          Subpage.GroupEdit,
        ],
        functionals: [
          Functional.Add,
          Functional.Delete
        ]
      },
      {
        page: Page.Journal,
        subpages: [
          Subpage.JournalDetails,
        ]
      },
    ]
  },
]
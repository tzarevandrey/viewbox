import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from './hooks';
import { Role } from './enums/roles.enum';
import './app.css';
import { AppMenu } from './components/app-menu/app-menu';
import { Authorize } from './components/authorize/authorize.page';
import { Contents } from './components/contents/contents.page';
import { Content } from './components/contents/content.page';
import { ContentEdit } from './components/contents/content.edit.page';
import { Groups } from './components/groups/groups.page';
import { Group } from './components/groups/group.page';
import { GroupEdit } from './components/groups/group.edit.page';
import { Journal } from './components/journal/journal.page';
import { JournalDetails } from './components/journal/journal-details.page';
import { Playlists } from './components/playlists/playlists.page';
import { Playlist } from './components/playlists/playlist.page';
import { PlaylistEdit } from './components/playlists/playlist.edit.page';
import { PlaylistCreate } from './components/playlists/playlist.create.page';
import { Viewpoints } from './components/viewpoints/viewpoints.page';
import { Viewpoint } from './components/viewpoints/viewpoint.page';
import { ViewpointEdit } from './components/viewpoints/viewpoint.edit.page';
import { ViewpointCreate } from './components/viewpoints/viewpoint.create.page';

function App() {
  const {
    roles
  } = useAppSelector(x => x.user);
  return (
    <BrowserRouter>
        {roles.length > 0 ? (
            <Routes>
              <Route path="/" element={<Viewpoints />}>
                <Route path=":id" element={<Viewpoint />} />
                <Route path="edit/:id" element={<ViewpointEdit />} />
                <Route path="create" element={<ViewpointCreate />} />
              </Route>
              <Route path="playlists" element={<Playlists />}>
                <Route path=":id" element={<Playlist />} />
                <Route path="edit/:id" element={<PlaylistEdit />} />
                <Route path="create" element={<PlaylistCreate />} />
              </Route>
              <Route path="content" element={<Contents />}>
                <Route path=":id" element={<Content />} />
                <Route path="edit/:id" element={<ContentEdit />} />
              </Route>
              <Route path="groups" element={<Groups />}>
                <Route path=":id" element={<Group />} />
                <Route path="edit/:id" element={<GroupEdit />} />
              </Route>
              {roles.includes(Role.Superuser) || roles.includes(Role.Support) ? (
                  <Route path="journal" element={<Journal />}>
                    <Route path=":id" element={<JournalDetails />} />
                  </Route>
                ) : null
              }
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Authorize />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          )
        }    
        <AppMenu roles={[...roles]} /> 
    </BrowserRouter>
  );
}

export default App;

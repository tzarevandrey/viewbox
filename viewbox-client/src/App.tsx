import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks';
import './app.css';
// import { Error } from './components/shared/error/error.page';
import { setAuth } from './reducers/user.slice';
import { useEffect } from 'react';
import { Play } from './components/pages/play/play.page';
import { Test } from './components/pages/test/test.page';
import { Viewpoints } from './components/pages/viewpoints/viewpoints.page';

function App() {

  const dispatch = useAppDispatch();

  const {
    isLoading,
    isError,
    data
  } = useAuth();

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setAuth(data));
    }
    // eslint-disable-next-line
  }, [isLoading, data])

  return (
    <BrowserRouter>
      {!isLoading
        ? (
          !isError && data
            ? (
              <div className='app-container'>
                <Routes>
                  <Route path='/play/:id' element={<Play />} />
                  <Route path='/test/:id' element={<Test />} />
                  <Route path='/' element={<Viewpoints />} />
                </Routes>
              </div>
            ) : null
            // <Error />
        ) : null
        // <Loading />
      }
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
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
    if (!isLoading && !isError && data) {
      dispatch(setAuth(data));
    }
    // eslint-disable-next-line
  }, [isLoading, isError, data])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/play/:id' element={<Play />} />
        <Route path='/test/:id' element={<Test />} />
        <Route path='/' element={<Viewpoints />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

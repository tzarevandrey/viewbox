import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks';
import './app.css';
import { AppMenu } from './components/shared/app-menu/app-menu';
import { Loading } from './components/shared/loading/loading.page';
import { Error } from './components/shared/error/error.page';
import { BasePage } from './components/shared/base-page/base.page';
import { setAuth } from './reducers/user.slice';
import { Fragment, useEffect } from 'react';
import { BaseModal } from './components/shared/base-modal/base.modal';
import { PAGES_CONFIG } from './core/dictionaries/pages.config.dictionary';

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

                <AppMenu
                  pages={Object.entries(PAGES_CONFIG)
                    .filter(x => data.roles
                      .filter(y => x[1].roles
                        .includes(y)).length > 0)
                    .map(x => +x[0])}
                />

                <BaseModal />
                <div className='page-container'>
                  <Routes>
                    {Object.entries(PAGES_CONFIG).filter(x => data.roles
                      .filter(y => x[1].roles
                        .includes(y)).length > 0)
                      .map(entry => {

                        const functionals = Object.entries(entry[1].functionals)
                          .filter(fnc => data.roles
                            .filter(x => Object.values(fnc[1])
                              .includes(x)).length > 0)
                          .map(x => +x[0]);

                        return (
                          <Fragment key={entry[0]}>
                            <Route
                              path={entry[1].link}
                              element={
                                <BasePage
                                  Jsx={entry[1].Jsx}
                                  functionals={functionals} />
                              }
                            />
                            {entry[1].subpages
                              .filter(x => data.roles
                                .filter(y => x.roles
                                  .includes(y)).length > 0)
                              .map((sp, i) => (
                                <Route
                                  key={`${entry[0]}_${i}`}
                                  path={sp.link}
                                  element={
                                    <BasePage
                                      Jsx={sp.Jsx}
                                      functionals={functionals}
                                    />
                                  }
                                />
                              ))
                            }
                          </Fragment>
                        )
                      })
                    }
                  </Routes>
                </div>
              </div>
            ) : <Error />
        ) : <Loading />
      }
    </BrowserRouter>
  );
}

export default App;

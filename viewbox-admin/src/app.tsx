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
import { ROLES_CONFIG } from './core/dictionaries/roles.config.dictionary';
import { Functional } from './core/enums/functional.enum';

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

  const pages: { [key: string]: Set<Functional> } = {};

  data?.roles.forEach(role => Object.entries(ROLES_CONFIG[`${role}`]).forEach(entry => {
    if (!(entry[0] in pages)) pages[entry[0]] = new Set<Functional>();
    entry[1].forEach(functional => pages[entry[0]].add(functional))
  }));

  return (
    <BrowserRouter>
      {!isLoading
        ? (
          !isError && data
            ? (
              <div className='app-container'>
                <AppMenu pages={Object.keys(pages).map(x => +x)} />
                <BaseModal />
                <div className='page-container'>
                  <Routes>
                    {Object.entries(pages).map(entry => {
                      const page = PAGES_CONFIG[entry[0]];
                      if (page !== undefined) {
                        const functionals = Array.from(entry[1]);
                        return (
                          <Fragment key={entry[0]}>
                            <Route
                              path={page.link}
                              element={
                                <BasePage
                                  Jsx={page.Jsx}
                                  functionals={functionals} />
                              }
                            />
                            <Fragment>
                              {page.functionals?.filter(x => functionals
                                .includes(+Object.keys(x)[0]))
                                .map(functional => {
                                  const subpageEntry = Object.entries(functional)[0];
                                  return (
                                    <Route
                                      key={`${entry[0]}_${subpageEntry[0]}`}
                                      path={subpageEntry[1].link}
                                      element={
                                        <BasePage
                                          Jsx={subpageEntry[1].Jsx}
                                          functionals={functionals}
                                        />
                                      }
                                    />
                                  )
                                })}
                            </Fragment>
                          </Fragment>
                        )
                      }
                      return null;
                    })}
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

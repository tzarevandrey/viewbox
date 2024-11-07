import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks';
import './app.css';
import { AppMenu } from './components/shared/app-menu/app-menu';
import { Loading } from './components/shared/loading/loading.page';
import { Error } from './components/shared/error/error.page';
import { ROLES_PAGES } from './core/dictionaries/roles.pages.dictionary';
import { BasePage } from './components/shared/base-page/base.page';
import { setAuth } from './reducers/user.slice';
import { Fragment, useEffect } from 'react';
import { BaseModal } from './components/shared/base-modal/base.modal';
import { Functional } from './core/enums/functional.enum';
import { Page } from './core/enums/pages.enum';
import { PAGES_CONFIG } from './core/dictionaries/pages.config.dictionary';
import { FunctionalPageType } from './core/enums/functional-page.type.enum';

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

  const pages: { [key: string]: Functional[] } = {};
  if (data) {
    data.roles.forEach(role => {
      Object.entries(ROLES_PAGES[role]).forEach(entry => {
        pages[entry[0]] = [...(pages[entry[0]] || []), ...entry[1]]
      })
    })
    Object.entries(pages)
      .forEach((ent) => pages[ent[0]] = Array.from(new Set(ent[1])));
  }

  return (
    <BrowserRouter>
      {!isLoading
        ? (
          !isError && data
            ? (
              <div className='app-container'>
                <AppMenu pages={Object.keys(pages).map(k => +Page[+k])} />
                <BaseModal />
                <div className='page-container'>
                  <Routes>
                    {Object.entries(pages).map(entry => {
                      const pageItem = PAGES_CONFIG[+entry[0] as Page]
                      return (
                        <Fragment key={entry[0]}>
                          <Route
                            path={pageItem.link}
                            element={<BasePage Jsx={pageItem.Jsx} functionals={entry[1]} />}
                          />
                          {entry[1].map(funcEntry => {
                            const functional = Object.entries(pageItem.functionals[FunctionalPageType.Subpage])
                              .find(x => x[0] === `${funcEntry}`);
                            if (functional) {
                              return (
                                <Route
                                  key={`${entry[0]}_${functional[0]}`}
                                  path={functional[1].link}
                                  element={<BasePage Jsx={functional[1].Jsx} functionals={entry[1]} />}
                                />
                              )
                            } else return null;
                          })}
                        </Fragment>
                      )
                    })}
                  </Routes>
                </div>
              </div>
            ) : (
              <Error />
            )
        ) : (
          <Loading />
        )
      }
    </BrowserRouter>
  );
}

export default App;

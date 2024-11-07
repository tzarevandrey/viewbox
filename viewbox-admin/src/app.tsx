import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks';
import './app.css';
import { AppMenu } from './components/shared/app-menu/app-menu';
import { Loading } from './components/shared/loading/loading.page';
import { Error } from './components/shared/error/error.page';
import { ROLES_PAGES } from './core/dictionaries/roles.pages.dict';
import { Page } from './core/enums/pages.enum';
import { Functional } from './core/enums/functional.enum';
import { PAGES_JSX_LINKS } from './core/dictionaries/pages.jsx.links.dict';
import { BasePage } from './components/shared/base-page/base.page';
import { setAuth } from './reducers/user.slice';
import { Fragment, useEffect } from 'react';
import { BaseModal } from './components/shared/base-modal/base.modal';
import { PAGES_FUNCTIONAL_JSX } from './core/dictionaries/pages.functional.jsx';
import { FUNCTIONAL_LINKS } from './core/dictionaries/functional.links';

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
  const pages: { page: Page, functionals: Functional[] }[] = [];
  if (data) {
    const userPages = ROLES_PAGES.filter(x => data.roles.includes(x.role)).map(x => x.pages).flat();
    const userPagesIds = Array.from(new Set(userPages.map(x => x.page)));
    userPagesIds.forEach(userPageId => {
      const userPage = userPages.filter(x => x.page === userPageId);
      pages.push({
        page: userPageId,
        functionals: Array.from(new Set(userPage.map(x => x.functionals || []).flat()))
      })
    });
  }
  return (
    <BrowserRouter>
      {!isLoading
        ? (
          !isError && data
            ? (
              <div className='app-container'>
                <AppMenu pages={pages.map(x => x.page)} />
                <BaseModal />
                <div className='page-container'>
                  <Routes>
                    {pages.map(pageItem => {
                      const item = PAGES_JSX_LINKS.find(x => x.page === pageItem.page);
                      if (item) {
                        return (
                          <Fragment key={item.link}>
                            <Route
                              path={item.link}
                              element={<BasePage Jsx={item.Jsx} functionals={pageItem.functionals} />}
                            />
                            {pageItem.functionals.map(functional => {
                              const Jsx = PAGES_FUNCTIONAL_JSX.find(x => x.page === pageItem.page)?.functionalPages.find(x => x.functional === functional)?.Jsx;
                              const link = FUNCTIONAL_LINKS.find(x => x.functional === functional)?.link;
                              if (Jsx && link) {
                                const fullLink = `${item.link}${link}/:id`;
                                return (
                                  <Route
                                    key={fullLink}
                                    path={fullLink}
                                    element={<BasePage Jsx={Jsx} functionals={pageItem.functionals} />}
                                  />
                                )
                              } else return null;
                            })}
                          </Fragment>
                        )
                      } else return null;
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

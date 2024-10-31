import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAuth } from './hooks';
import './app.css';
import { AppMenu } from './components/shared/app-menu/app-menu';
import { Loading } from './components/shared/loading/loading.page';
import { Error } from './components/shared/error/error.page';
import { ROLES_PAGES } from './core/dictionaries/roles.pages.dict';
import { Page } from './core/enums/pages.enum';
import { Subpage } from './core/enums/subpages.enum';
import { Functional } from './core/enums/functional.enum';
import { PAGES_JSX_LINKS } from './core/dictionaries/pages.jsx.links.dict';
import { SUBPAGES_JSX_LINKS } from './core/dictionaries/subpages.jsx.links.dict';
import { BasePage } from './components/shared/base-page/base.page';
import { setAuth } from './reducers/user.slice';
import { useEffect } from 'react';

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
  const pages: { page: Page, subpages: Subpage[], functionals: Functional[] }[] = [];
  if (data) {
    const temp = ROLES_PAGES.filter(x => data.roles.includes(x.role)).map(x => x.pages).flat();
    const pt = Array.from(new Set(temp.map(x => x.page)));
    pt.forEach(element => {
      const t = temp.filter(x => x.page === element);
      pages.push({
        page: element,
        subpages: Array.from(new Set(t.map(x => x.subpages || []).flat())),
        functionals: Array.from(new Set(t.map(x => x.functionals || []).flat()))
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
                <div className='page-container'>
                  <Routes>
                    {pages.map(pageItem => {
                      const item = PAGES_JSX_LINKS.find(x => x.page === pageItem.page);
                      if (item) {
                        return (
                          <Route path={item.link} element={<BasePage Jsx={item.Jsx} subpages={pageItem.subpages} functionals={pageItem.functionals} />} key={pageItem.page}>
                            {pageItem.subpages.map(subpageItem => {
                              const subItem = SUBPAGES_JSX_LINKS.find(x => x.page === +subpageItem);
                              if (subItem) {
                                return (
                                  <Route path={subItem.link} element={<BasePage Jsx={subItem.Jsx} functionals={pageItem.functionals} />} key={subItem.page} />
                                )
                              } else return null;
                            })}
                          </Route>
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

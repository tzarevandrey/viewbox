import { Menu, MenuProps } from "antd";
import { Page } from '../../core/enums/pages.enum';
import { PAGES_MENU_NAMES } from '../../core/dictionaries/pages.menu-names.dict';
import { PAGES_JSX_LINKS } from '../../core/dictionaries/pages.jsx.links.dict';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type TProps = {
  pages: Page[];
}

type MenuItem = Required<MenuProps>['items'][number];

export const AppMenu = ({ pages }: TProps) => {
  const navigate = useNavigate();
  const temp = PAGES_MENU_NAMES.filter(x => pages.includes(x.page));
  const minNumber = Math.min(...temp.map(x => x.order))
  const items: MenuItem[] = PAGES_MENU_NAMES.filter(x => pages.includes(x.page)).sort(x => x.order).map(x => ({ key: `${x.page}`, label: x.name }))
  const index = PAGES_MENU_NAMES.find(x => x.order === minNumber)?.page;
  useEffect(() => {
    const firstLink = PAGES_JSX_LINKS.find(x => x.page === index)?.link;
    if (firstLink) navigate(firstLink);
    // eslint-disable-next-line
  }, [])
  return (
    <Menu
      defaultSelectedKeys={[`${index}`]}
      mode="vertical"
      theme="dark"
      items={items}
      onClick={(e) => {
        const lnk = PAGES_JSX_LINKS.find(x => x.page === +e.key)?.link;
        if (lnk) navigate(lnk);
      }}
    />
  )
}
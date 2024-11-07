import { Menu, MenuProps } from "antd";
import { Page } from '../../../core/enums/pages.enum';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';

type TProps = {
  pages: Page[];
}

type MenuItem = Required<MenuProps>['items'][number];

export const AppMenu = ({ pages }: TProps) => {
  const navigate = useNavigate();
  const items = Object.entries(PAGES_CONFIG).filter(page => pages.includes(+Page[+page])).map(entry => entry[1]).sort((a, b) => a.order - b.order);
  useEffect(() => {
    if (items.length > 0) navigate(items[0].link);
    // eslint-disable-next-line
  }, [])
  return (
    <Menu
      defaultSelectedKeys={[items[0].link]}
      mode="vertical"
      theme="dark"
      items={items.map(x => ({ key: x.link, label: x.name }))}
      onClick={e => navigate(e.key)}
    />
  )
}
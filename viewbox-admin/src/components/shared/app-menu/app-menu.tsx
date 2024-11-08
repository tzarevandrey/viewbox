import { Menu } from "antd";
import { Page } from '../../../core/enums/pages.enum';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { PAGES_CONFIG } from '../../../core/dictionaries/pages.config.dictionary';

type TProps = {
  pages: Page[];
}

export const AppMenu = ({ pages }: TProps) => {
  const navigate = useNavigate();
  const items = Object.entries(PAGES_CONFIG)
    .filter(entry => pages
      .includes(+entry[0]))
    .sort((a, b) => a[1].order - b[1].order)
    .map(entry => ({ key: entry[1].link, label: entry[1].name }));
  useEffect(() => {
    if (items.length > 0) navigate(items[0].key);
    // eslint-disable-next-line
  }, [])
  return (
    <Menu
      defaultSelectedKeys={[items[0].key]}
      mode="vertical"
      theme="dark"
      items={items}
      onClick={e => navigate(e.key)}
    />
  )
}
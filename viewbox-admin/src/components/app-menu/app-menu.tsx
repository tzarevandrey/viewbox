import { Menu, MenuProps } from "antd";
import { Role } from "../../enums/roles.enum";

type TProps = {
    roles: Role[];
}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {key: '1key', label: 'first'},
    {key: '2key', label: 'second'},
]

export const AppMenu = ({ roles }: TProps) => {

    return (
        <Menu 
        defaultSelectedKeys={['2key']}
        mode="vertical"
        theme="dark"
        items={items}
        onClick={(e) => console.log(e)}
        />
    )
}
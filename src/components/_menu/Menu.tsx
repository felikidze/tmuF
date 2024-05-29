import {useState, FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {AppstoreOutlined, MailOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu as AntMenu} from 'antd';

import {RoutePath} from '@router/config/routeConfig';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        label: 'Опрос',
        key: RoutePath.survey,
        icon: <MailOutlined />
    },
    {
        label: 'AI',
        key: RoutePath.neuro,
        icon: <AppstoreOutlined />
    }
];

const Menu: FC = () => {
    const [current, setCurrent] = useState(RoutePath.main);
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        navigate(e.key);
    };

    return (
        <AntMenu
            style={{marginBottom: '32px'}}
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Menu;

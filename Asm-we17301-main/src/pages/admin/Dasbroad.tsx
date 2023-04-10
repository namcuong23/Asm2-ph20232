import React, { useState } from 'react'
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import ProductAdd from './ProductAdd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [

    {

        key: 'SubMenu1',
        label: (
            <a style={{ float: 'left', textDecoration: 'none', color: 'white' }} href="/">Home</a>
        )
    },
    {
        key: 'SubMenu2',
        label: (
            <a style={{ float: 'left', textDecoration: 'none', color: 'white' }} href="/admin/products">Products Maneger</a>
        )
    },
    // {
    //     key: 'SubMenu3',
    //     label: (
    //         <a style={{ float: 'left', textDecoration: 'none', color: 'white' }} href="#">User Maneger</a>
    //     )
    // },
    {
        key: 'SubMenu4',
        label: (
            <a style={{ float: 'left', textDecoration: 'none', color: 'white' }} href="/admin/category">Category Maneger</a>
        )
    }

];


type Props = {}
const Dasbroad = (props: Props) => {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ backgroundColor: 'slategray' }} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <h3 style={{ height: 32, margin: 16, background: 'slategray', color: 'black' }} >Admin Page</h3>
                <Menu style={{ backgroundColor: 'slategray' }} theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>

                    <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>

    )
}

export default Dasbroad
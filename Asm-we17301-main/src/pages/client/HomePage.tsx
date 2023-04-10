import React, { useEffect, useState } from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { useNavigate } from "react-router-dom"
import jwtDecode from 'jwt-decode';
import axios from 'axios';
const { Header, Content, Footer } = Layout;
type Props = {}
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




const HomePage = (props: Props) => {

    // check user

    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('user');
        if (token) {
            const decoded = jwtDecode(token);
            setUser(decoded);
        }
    }, [props]);
    // const handleLogin = async () => {
    //     const response = await axios.post('/signin');
    //     const token = response.data.token;
    //     localStorage.setItem('token', token);
    //     const decoded = jwtDecode(token);
    //     setUser(decoded);
    // };



    const navigate = useNavigate()
    function handleLogout() {
        // Xoá token đã lưu trữ
        localStorage.removeItem('user');
        // Điều hướng về trang đăng nhập
        navigate(`/signin`)

    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const item: MenuItem[] = [

        {
            label: (
                <a style={{
                    textDecoration: 'none'
                }}
                    href="/" rel="noopener noreferrer">
                    Home
                </a>
            ),
            key: 'setting:3',

        },
        {
            label: (

                <a style={{
                    textDecoration: 'none'
                }} href="/signin" rel="noopener noreferrer">
                    Signin
                </a>
            ),
            key: 'setting:4',

        },
        {
            label: (
                <a style={{
                    textDecoration: 'none'
                }} href="/signup" rel="noopener noreferrer">
                    Sign Up
                </a>
            ),
            key: 'setting:5',

        },

        // {
        //     label: (
        //         <a onClick={handleLogout} style={{
        //             textDecoration: 'none'
        //         }} rel="noopener noreferrer">
        //             Logout
        //         </a>
        //     ),
        //     key: 'setting:7',

        // },
        {
            label: (
                <div>
                    {user ? (
                        <div>
                            {user.role === 'admin'}
                            <a href="/admin">Admin</a>

                        </div>
                    ) : (
                        <div>
                            <div> <a style={{ textDecoration: 'none' }} onClick={handleLogout} >Logut</a></div>
                        </div>
                    )
                    }
                </div >
            ),
            key: 'setting:8',

        },



    ]


    return (
        <Layout>

            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', backgroundColor: 'slategray' }}>

                <Menu
                    style={{ backgroundColor: 'slategray' }}
                    theme="light"
                    mode="horizontal"
                    // defaultSelectedKeys={['2']}
                    items={item}


                />
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}><Outlet /></div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
        </Layout>
    )
}

export default HomePage
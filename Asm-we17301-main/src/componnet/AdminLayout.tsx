import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div>
            <header>Header</header>
            <Outlet />
            <footer>Footer</footer>
        </div>
    )
}

export default AdminLayout
import React from 'react'
import { Outlet } from "react-router-dom"
const ClientLayout = () => {
    return (
        <div>
            <header>Header</header>
            <Outlet />
            <footer>Footer</footer>
        </div>
    )
}

export default ClientLayout
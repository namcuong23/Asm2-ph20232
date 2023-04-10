import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const navigate = useNavigate();

    function handleLogout() {
        // Xoá token đã lưu trữ
        localStorage.removeItem('user');
        // Điều hướng về trang đăng nhập
        navigate('/signin');
    }

    // Sử dụng useEffect để kiểm tra trạng thái đăng nhập của người dùn

    return (
        <button onClick={handleLogout}>Đăng xuất</button>
    );
}
export default LogoutButton;
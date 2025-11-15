import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const token = localStorage.getItem('token');
    const location = useLocation();

    // Hide navbar on /profile
    if (location.pathname === '/profile') return null;

    return (
        <nav style={{ marginBottom: '20px' }}>
            {/* On home page, show Register and Login */}
            {location.pathname === '/' && (
                <>
                    <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
                    <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
                </>
            )}
            {/* On /register, show only Login */}
            {location.pathname === '/register' && (
                <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            )}
            {/* On /login, show only Profile if logged in */}
            {location.pathname === '/login' && token && (
                <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
            )}
        </nav>
    );
}
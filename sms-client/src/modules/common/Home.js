import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Home({ message }) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (token && user && user.roles && user.roles.length > 0) {
            if (user.roles.includes('admin')) navigate('/admins/dashboard');
            else if (user.roles.includes('teacher')) navigate('/teachers/dashboard');
            else if (user.roles.includes('student')) navigate('/students/dashboard');
            else if (user.roles.includes('parent')) navigate('/parents/dashboard');
        }
    }, [token, user, navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Education Portal</h1>
            <p>
                {token && user && user.roles && user.roles.length > 0
                    ? (" Redirecting to your dashboard...") : (
                        <>
                            "Please <Link to="/login">login</Link> or <Link to="/register">register</Link> to access your dashboard."
                        </>
                    )}
            </p>
        </div>
    );

}
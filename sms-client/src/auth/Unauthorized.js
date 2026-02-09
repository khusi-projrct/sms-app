import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized({ message }) {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 2000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Unauthorized</h1>
            <p>{message || 'You do not have permission to access this page.'}</p>
            <p>Redirecting to Home...</p>
        </div>
    )
}
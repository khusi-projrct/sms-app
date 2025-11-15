import React from 'react';
import { Navigate } from 'react-router-dom';
import Unauthorized from './Unauthorized';

export default function ProtectedRoute({ children, allowedRoles }) {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        // User is not authenticated, redirect to login
        return <Navigate to="/login" replace />;
    }
    if (!user || !user.roles || user.roles.length === 0) {
        return <Unauthorized message="You do not have any roles assigned." />;
    }

    if (!user.roles.some(role => allowedRoles.includes(role))) {
        return <Unauthorized message="You are not authorized to access this page." />;
    }

    // User is authenticated, render the children components
    return children;
}
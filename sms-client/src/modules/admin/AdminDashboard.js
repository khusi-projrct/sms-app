import React from 'react';
import { useAuth } from '../../context/AuthContext';
import PermissionGuard from "../../auth/PermissionGuard";

export default function AdminDashboard() {
    const { user, role, permissions, logout } = useAuth();

    return (
        <div className="container mt-3">
            <h3>Admin Dashboard</h3>
            <hr />
            <p><strong>Name:</strong> {user?.username}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {role}</p>
            <h5>Permissions:</h5>
            <ul>
                {permissions?.map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>
            <button className="btn btn-danger mt-3" onClick={logout}>
                Logout
            </button>
            <PermissionGuard permission="school:create">
                <button className="btn btn-primary">Create School</button>
            </PermissionGuard>

            <PermissionGuard permission="school:read">
                <button className="btn btn-secondary">View Schools</button>
            </PermissionGuard>
        </div>
    );
}
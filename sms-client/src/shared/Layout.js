import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout() {
    const token = localStorage.getItem('token');

    // If you still want to restrict layout to logged-in users
    if (!token) {
        return <Outlet />;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <div className="container-fluid flex-grow-1">
                <div className="row">
                    <aside className="col-md-2 bg-light p-0 border-end">
                        <Sidebar />
                    </aside>
                    <main className="col-md-10 p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
}

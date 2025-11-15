import React, { Suspense, lazy, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RoleProtectedRoute from './components/RoleProtectedRoute';
import Layout from './shared/Layout';

const Home = lazy(() => import('./components/Home'));
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const Logout = lazy(() => import('./components/Logout'));
const Profile = lazy(() => import('./components/Profile'));
const StudentDashboard = lazy(() => import('./modules/Students/components/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./modules/Teachers/components/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./modules/Admins/components/AdminDashboard'));
const ParentDashboard = lazy(() => import('./modules/Parents/components/ParentDashboard'));
const RecoverPassword = lazy(() => import('./components/RecoverPassword'));
const ResetPassword = lazy(() => import('./components/ResetPassword'));

function BodyClassManager() {
  const location = useLocation();

  useEffect(() => {
    // Routes that should use the "blank-page" layout
    const blankPageRoutes = ['/login', '/register'];

    const isBlankPage = blankPageRoutes.includes(location.pathname);

    if (isBlankPage) {
      document.body.className = 'vertical-layout vertical-menu 1-column blank-page blank-page';
      document.body.setAttribute('data-col', '1-column');
    } else {
      document.body.className = 'vertical-layout vertical-menu 2-columns fixed-navbar';
      document.body.setAttribute('data-col', '2-columns');
    }

    document.body.setAttribute('data-open', 'click');
    document.body.setAttribute('data-menu', 'vertical-menu');

    return () => {
      document.body.className = '';
      document.body.removeAttribute('data-open');
      document.body.removeAttribute('data-menu');
      document.body.removeAttribute('data-col');
    };
  }, [location.pathname]);

  return null; // This component only manages body attributes
}

function App() {
  return (
    <BrowserRouter>
      <BodyClassManager />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* No layout for login/register */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />

          {/* Routes with shared layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />

            <Route
              path="/students/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/teachers/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['teacher']}>
                  <TeacherDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admins/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/parents/dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['parent']}>
                  <ParentDashboard />
                </RoleProtectedRoute>
              }
            />
          </Route>
          <Route path="/recover-password" element={<RecoverPassword />} />  
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Suspense>
    </BrowserRouter>

  );
}

export default App;

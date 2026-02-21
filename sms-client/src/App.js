import React, { Suspense, lazy, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RoleProtectedRoute from './auth/RoleProtectedRoute';
import PermissionRoute from "./auth/PermissionRoute";
import Layout from './shared/Layout';
import { ToastProvider } from "./context/ToastContext";

const Home = lazy(() => import('./modules/common/Home'));
const Register = lazy(() => import('./auth/Register'));
const Login = lazy(() => import('./auth/Login'));
const Logout = lazy(() => import('./auth/Logout'));
const Profile = lazy(() => import('./modules/common/Profile'));
const StudentDashboard = lazy(() => import('./modules/student/StudentDashboard'));
const TeacherDashboard = lazy(() => import('./modules/teacher/TeacherDashboard'));
const AdminDashboard = lazy(() => import('./modules/admin/AdminDashboard'));
const ParentDashboard = lazy(() => import('./modules/parent/ParentDashboard'));
const RecoverPassword = lazy(() => import('./auth/RecoverPassword'));
const ResetPassword = lazy(() => import('./auth/ResetPassword'));

const SchoolList = lazy(() => import('./modules/admin/schools/SchoolList'));
const ClassList = lazy(() => import('./modules/admin/classes/ClassList'));

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
    <ToastProvider>
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
                path="/admins/schools"
                element={
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <PermissionRoute permission="school:read">
                      <SchoolList />
                    </PermissionRoute>
                  </RoleProtectedRoute>
                }
              />
              <Route
                path="/admins/classes"
                element={
                  <RoleProtectedRoute allowedRoles={['admin']}>
                    <PermissionRoute permission="class:read">
                      <ClassList />
                    </PermissionRoute>
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
    </ToastProvider>
  );
}

export default App;

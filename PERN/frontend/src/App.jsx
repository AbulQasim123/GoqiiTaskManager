import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Lazy loaded pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Tasks = lazy(() => import('./pages/Tasks'));
const TaskForm = lazy(() => import('./pages/TaskForm'));
const AuditLog = lazy(() => import('./pages/AuditLog'));
const Profile = lazy(() => import('./pages/Profile'));

const Loading = () => (
    <div className="text-center py-5">
        <div className="spinner-border"></div>
        <p className="mt-2 text-muted">Loading...</p>
    </div>
);

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    return user ? children : <Navigate to="/login" />;
};

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar isOpen={sidebarOpen} />

            <div className="main-content">
                <Navbar
                    toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                {children}
            </div>
        </>
    );
};


function App() {
    return (
        <AuthProvider>
            <BrowserRouter>

                <Suspense fallback={<Loading />}>

                    <Routes>

                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />

                        {/* Private Routes */}
                        <Route
                            path="/*"
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Routes>
                                            <Route
                                                path="/dashboard"
                                                element={<Dashboard />}
                                            />

                                            <Route
                                                path="/profile"
                                                element={<Profile />}
                                            />

                                            <Route
                                                path="/tasks"
                                                element={<Tasks />}
                                            />

                                            <Route
                                                path="/tasks/new"
                                                element={<TaskForm />}
                                            />

                                            <Route
                                                path="/tasks/edit/:id"
                                                element={<TaskForm />}
                                            />

                                            <Route
                                                path="/audit-logs"
                                                element={<AuditLog />}
                                            />

                                            <Route
                                                path="/"
                                                element={
                                                    <Navigate to="/dashboard" />
                                                }
                                            />
                                        </Routes>
                                    </Layout>
                                </PrivateRoute>
                            }
                        />

                    </Routes>

                </Suspense>

            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
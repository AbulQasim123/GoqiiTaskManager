import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen }) => {
    const { isAdmin } = useAuth();

    return (
        <div className={`sidebar d-flex flex-column ${isOpen ? 'show' : ''}`}>
            <div className="p-4 border-bottom border-secondary">
                <h4 className="mb-0 fw-bold d-flex align-items-center">
                    <img
                        src="https://goqii.com/webApp/uswebsite2025/assets/images/GUS-logo.png"
                        
                        className="me-2"
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    />
                    GOQii
                </h4>

                <small className="text-black">Task Management System</small>
            </div>

            <nav className="nav flex-column py-3">
                <NavLink to="/dashboard" className="nav-link">
                    <i className="bi bi-speedometer2"></i> Dashboard
                </NavLink>

                <NavLink to="/tasks" className="nav-link">
                    <i className="bi bi-kanban"></i> Tasks
                </NavLink>

                {isAdmin && (
                    <>
                        <NavLink to="/tasks?filter=all" className="nav-link">
                            <i className="bi bi-people"></i> All Users Tasks
                        </NavLink>

                        <NavLink to="/audit-logs" className="nav-link">
                            <i className="bi bi-journal-text"></i> Audit Logs
                        </NavLink>
                    </>
                )}
            </nav>

            <div className="mt-auto p-4 border-top border-secondary">
                <small className="text-muted">Laravel 12 + React</small>
            </div>
        </div>
    );
};

export default Sidebar;
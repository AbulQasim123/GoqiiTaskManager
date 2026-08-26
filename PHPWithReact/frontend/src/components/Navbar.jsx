import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="navbar-top d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <button
                    className="btn btn-sm btn-outline-secondary d-md-none me-3"
                    onClick={toggleSidebar}
                >
                    <i className="bi bi-list"></i>
                </button>

                <h5 className="mb-0 fw-bold text-primary">
                    GOQii Task Manager
                </h5>
            </div>

            <div className="d-flex align-items-center gap-3">
                <span className="badge bg-primary">
                    {isAdmin ? 'Admin' : 'User'}
                </span>

                <div className="dropdown">
                    <button
                        className="btn btn-light dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <i className="bi bi-person-circle me-2"></i>
                        {user?.name}
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <span className="dropdown-item-text text-muted">
                                {user?.email}
                            </span>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li>
                            <button
                                className="dropdown-item"
                                onClick={() => navigate('/profile')}
                            >
                                <i className="bi bi-person me-2"></i>
                                Profile
                            </button>
                        </li>

                        <li>
                            <hr className="dropdown-divider" />
                        </li>

                        <li>
                            <button
                                className="dropdown-item text-danger"
                                onClick={logout}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
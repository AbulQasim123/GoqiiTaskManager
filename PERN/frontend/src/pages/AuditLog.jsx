import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const AuditLog = () => {
    const [logs, setLogs] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(true);
    const [actions, setActions] = useState([]);
    const { showToast } = useToast();

    // Filters
    const [filters, setFilters] = useState({
        action: '',
        search: '',
        from_date: '',
        to_date: '',
        per_page: 15,
    });

    useEffect(() => {
        fetchActions();
        fetchLogs();
    }, []);

    const fetchActions = async () => {
        try {
            const res = await api.get('/audit-logs/actions');
            setActions(res.data.data);
        } catch (err) {
            console.error('Failed to fetch actions', err);
            showToast('Failed to fetch actions', 'error')

        }
    };

    const fetchLogs = async (page = 1, customFilters = filters) => {
        setLoading(true);

        try {
            let url = `/audit-logs?page=${page}&per_page=${customFilters.per_page}`;

            if (customFilters.action) {
                url += `&action=${customFilters.action}`;
            }

            if (customFilters.search) {
                url += `&search=${encodeURIComponent(customFilters.search)}`;
            }

            if (customFilters.from_date) {
                url += `&from_date=${customFilters.from_date}`;
            }

            if (customFilters.to_date) {
                url += `&to_date=${customFilters.to_date}`;
            }

            const res = await api.get(url);

            const paginationData = res.data.data;

            setLogs(paginationData.data);

            setPagination({
                current_page: paginationData.current_page,
                last_page: paginationData.last_page,
                total: paginationData.total,
            });

        } catch (err) {
            console.error('Failed to fetch audit logs', err);
            showToast('Failed to fetch audit logs', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        fetchLogs(1, filters);
    };

    const clearFilters = () => {
        const reset = {
            action: '',
            search: '',
            from_date: '',
            to_date: '',
            per_page: 15,
        };
        setFilters(reset);
        fetchLogs(1, reset);
    };

    const getActionBadge = (action) => {
        const map = {
            login: 'success',
            logout: 'secondary',
            create: 'primary',
            update: 'warning',
            delete: 'danger',
        };
        return map[action] || 'info';
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">
                    <i className="bi bi-journal-text me-2"></i>Audit Logs
                </h4>
                <span className="badge bg-dark">Total: {pagination.total || 0}</span>
            </div>

            {/* Filters Card */}
            <div className="card border-0 shadow-sm mb-4">
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <label className="form-label small text-muted">Action</label>
                            <select
                                className="form-select"
                                name="action"
                                value={filters.action}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Actions</option>
                                {actions.map((action) => (
                                    <option key={action} value={action}>
                                        {action.charAt(0).toUpperCase() + action.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label small text-muted">Search</label>
                            <input
                                type="text"
                                className="form-control"
                                name="search"
                                placeholder="Search description..."
                                value={filters.search}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label small text-muted">From Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="from_date"
                                value={filters.from_date}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="col-md-2">
                            <label className="form-label small text-muted">To Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="to_date"
                                value={filters.to_date}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="col-md-2 d-flex align-items-end gap-2">
                            <button className="btn btn-primary w-100" onClick={applyFilters}>
                                <i className="bi bi-funnel me-1"></i>Filter
                            </button>
                            <button className="btn btn-outline-secondary" onClick={clearFilters} title="Clear">
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Logs Table */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary"></div>
                            <p className="text-muted mt-2">Loading audit logs...</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0 align-middle">
                                <thead className="table-light">
                                    <tr>
                                        <th className="ps-4">#</th>
                                        <th>Admin User</th>
                                        <th>Action</th>
                                        <th>Entity</th>
                                        <th>Description</th>
                                        <th>IP Address</th>
                                        <th>Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4 text-muted">
                                                <i className="bi bi-inbox fs-1 d-block mb-2"></i>
                                                No audit logs found
                                            </td>
                                        </tr>
                                    ) : (
                                        logs.map((log, index) => (
                                            <tr key={log.id}>
                                                <td className="ps-4 text-muted small">
                                                    {(pagination.current_page - 1) * filters.per_page + index + 1}
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}>
                                                            {log.user?.name?.charAt(0).toUpperCase() || 'A'}
                                                        </div>
                                                        <div>
                                                            <div className="fw-semibold small">{log.user?.name}</div>
                                                            <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{log.user?.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-${getActionBadge(log.action)}`}>
                                                        {log.action}
                                                    </span>
                                                </td>
                                                <td>
                                                    {log.entity_type ? (
                                                        <span className="small">
                                                            {log.entity_type} #{log.entity_id}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted small">-</span>
                                                    )}
                                                </td>
                                                <td className="small" style={{ maxWidth: '250px' }}>
                                                    {log.description || '-'}
                                                </td>
                                                <td>
                                                    <span className="font-monospace small text-muted">{log.ip_address || '-'}</span>
                                                </td>
                                                <td className="small text-muted">
                                                    {formatDate(log.created_at)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            {!loading && pagination.last_page > 1 && (
                <nav className="mt-4">
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => fetchLogs(pagination.current_page - 1)}>
                                <i className="bi bi-chevron-left"></i>
                            </button>
                        </li>
                        {Array.from({ length: pagination.last_page }, (_, i) => (
                            <li key={i} className={`page-item ${pagination.current_page === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => fetchLogs(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => fetchLogs(pagination.current_page + 1)}>
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default AuditLog;
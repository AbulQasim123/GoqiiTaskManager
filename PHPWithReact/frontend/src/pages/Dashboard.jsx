import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [stats, setStats] = useState({ status_counts: [], user_counts: [] });
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/tasks/stats');

            setStats(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const map = { 'todo': 'secondary', 'in-progress': 'warning', 'done': 'success' };
        return map[status] || 'secondary';
    };

    return (
        <div>
            <h4 className="mb-4">Dashboard Overview</h4>
            {loading ? (
                <div className="text-center py-5"><div className="spinner-border"></div></div>
            ) : (
                <>
                    <div className="row g-4 mb-4">
                        {stats.status_counts?.map((stat) => (
                            <div className="col-md-4" key={stat.status}>
                                <div className="stat-card">
                                    <h6 className="text-muted text-uppercase mb-2">{stat.status}</h6>
                                    <h2 className="mb-0 fw-bold">{stat.count}</h2>
                                    <span className={`badge bg-${getStatusColor(stat.status)} mt-2`}>Tasks</span>
                                </div>
                            </div>
                        ))}
                        {stats.status_counts?.length === 0 && (
                            <div className="col-12"><div className="alert alert-info">No tasks found. Create your first task!</div></div>
                        )}
                    </div>

                    {isAdmin && stats.user_counts?.length > 0 && (
                        <div className="card border-0 shadow-sm">
                            <div className="card-header bg-white">
                                <h5 className="mb-0">Tasks Per User</h5>
                            </div>
                            <div className="card-body">
                                <table className="table table-hover">
                                    <thead>
                                        <tr><th>User</th><th>Task Count</th></tr>
                                    </thead>
                                    <tbody>
                                        {stats.user_counts.map((u) => (
                                            <tr key={u.name}><td>{u.name}</td><td><span className="badge bg-primary">{u.task_count}</span></td></tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Dashboard;
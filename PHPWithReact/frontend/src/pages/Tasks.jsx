import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { useAuth } from "../context/AuthContext";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState({});
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { showToast } = useToast();

    useEffect(() => {
        const status = searchParams.get("status") || "";
        setFilter(status);
        fetchTasks(1, status);
    }, [searchParams]);

    const fetchTasks = async (page = 1, status = filter) => {
        setLoading(true);
        try {
            const url = `/tasks?page=${page}${status ? `&status=${status}` : ""}`;
            const res = await api.get(url);
            setTasks(res.data.data);
            setPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
                total: res.data.total,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this task?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            showToast("Task deleted successfully", "success");
            fetchTasks(pagination.current_page);
        } catch (err) {
            alert("Failed to delete");
        }
    };

    const getPriorityClass = (p) => {
        const map = {
            high: "high-priority",
            medium: "medium-priority",
            low: "low-priority",
        };
        return map[p] || "";
    };

    const getStatusBadge = (s) => {
        const map = {
            todo: "secondary",
            "in-progress": "warning",
            done: "success",
        };
        return map[s] || "secondary";
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="mb-0">Tasks</h4>
                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/tasks/new")}
                >
                    <i className="bi bi-plus-lg me-2"></i>New Task
                </button>
            </div>

            <div className="mb-3">
                <select
                    className="form-select w-auto"
                    value={filter}
                    onChange={(e) => {
                        setFilter(e.target.value);
                        fetchTasks(1, e.target.value);
                    }}
                >
                    <option value="">All Status</option>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                </select>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border"></div>
                </div>
            ) : (
                <>
                    {tasks.map((task) => (
                        <div
                            className={`task-card ${getPriorityClass(task.priority)}`}
                            key={task.id}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 className="mb-1">{task.title}</h5>
                                    <p className="text-muted mb-2">
                                        {task.description || "No description"}
                                    </p>
                                    <div className="d-flex gap-2 align-items-center">
                                        <span
                                            className={`badge badge-status bg-${getStatusBadge(task.status)}`}
                                        >
                                            {task.status}
                                        </span>
                                        <span className="badge bg-dark">{task.priority}</span>
                                        {isAdmin && (
                                            <small className="text-muted">by {task.user?.name}</small>
                                        )}
                                        {task.due_date && (
                                            <small className="text-muted">
                                                <i className="bi bi-calendar me-1"></i>
                                                {task.due_date}
                                            </small>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm btn-outline-primary"
                                        onClick={() => navigate(`/tasks/edit/${task.id}`)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {tasks.length === 0 && (
                        <div className="alert alert-info">No tasks found.</div>
                    )}

                    {pagination.last_page > 1 && (
                        <nav className="mt-4">
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: pagination.last_page }, (_, i) => (
                                    <li
                                        key={i}
                                        className={`page-item ${pagination.current_page === i + 1 ? "active" : ""}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => fetchTasks(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </>
            )}
        </div>
    );
};

export default Tasks;

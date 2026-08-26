import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from "../context/ToastContext";
import * as yup from 'yup';
import api from '../services/api';

const schema = yup.object({
    title: yup.string().min(3, 'Title must be at least 3 characters').max(255, 'Title too long').required('Title is required?'),
    description: yup.string().min(10, 'Description must be at 10 characters').required('Description is required?'),
    status: yup.string().oneOf(['todo', 'in-progress', 'done'], 'Invalid status').required('Status is required?'),
    priority: yup.string().oneOf(['low', 'medium', 'high'], 'Invalid priority').required('Priority is required?'),
    due_date: yup.date().nullable().typeError('Invalid date format'),
}).required();

const TaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const { showToast } = useToast();

    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const today = new Date().toLocaleDateString('en-CA');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            status: 'todo',
            priority: 'medium',
            due_date: '',
        }
    });

    useEffect(() => {
        if (isEdit) fetchTask();
    }, [id]);

    const fetchTask = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/tasks/${id}`);
            const t = res.data.data;
            reset({
                title: t.title,
                description: t.description || '',
                status: t.status,
                priority: t.priority,
                due_date: t.due_date || '',
            });
        } catch (err) {
            showToast('Task not found', 'error');
            setTimeout(() => navigate('/tasks'), 1500);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        setGeneralError('');
        setSaving(true);

        // Empty string ko null karo
        const payload = {
            ...data,
            description: data.description || null,
            due_date: data.due_date || null,
        };

        try {
            if (isEdit) {
                await api.put(`/tasks/${id}`, payload);
                showToast('Task updated successfully', 'success');
            } else {
                await api.post('/tasks', payload);
                showToast('Task created successfully', 'success');
            }
            navigate('/tasks');
        } catch (err) {
            const resData = err.response?.data;
            if (resData?.errors) {
                const firstError = Object.values(resData.errors)[0]?.[0];
                showToast(firstError || 'Save failed', 'error');
            } else if (resData?.error) {
                showToast(resData.error, 'error');
            } else {
                showToast('Save failed', 'error');
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="text-center py-5"><div className="spinner-border"></div></div>;

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white">
                        <h5 className="mb-0">{isEdit ? 'Edit Task' : 'New Task'}</h5>
                    </div>
                    <div className="card-body">
                        {generalError && <div className="alert alert-danger">{generalError}</div>}

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    {...register('title')}
                                />
                                {errors.title && (
                                    <div className="text-danger small mt-1">{errors.title.message}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    placeholder="Description"
                                    {...register('description')}
                                />
                                {errors.description && (
                                    <div className="text-danger small mt-1">{errors.description.message}</div>
                                )}
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                                        {...register('status')}
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                    {errors.status && (
                                        <div className="text-danger small mt-1">{errors.status.message}</div>
                                    )}
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Priority</label>
                                    <select
                                        className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
                                        {...register('priority')}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    {errors.priority && (
                                        <div className="text-danger small mt-1">{errors.priority.message}</div>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    className={`form-control ${errors.due_date ? 'is-invalid' : ''}`}
                                    min={today}
                                    {...register('due_date')}
                                />
                                {errors.due_date && (
                                    <div className="text-danger small mt-1">{errors.due_date.message}</div>
                                )}
                            </div>

                            <div className="d-flex gap-2">
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? 'Saving...' : (isEdit ? 'Update' : 'Create')}
                                </button>
                                <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/tasks')}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskForm;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const schema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const Login = () => {
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setGeneralError('');
        try {
            await login(data.email, data.password);
            showToast('Login Successfully','success');
            navigate('/dashboard');
        } catch (err) {
            if (err.response?.status === 401) {
                showToast('Login Failed: Invalid credentials', 'error');
            } else if (err.response?.data?.errors) {
                showToast(
                    err.response?.data?.message || 'Validation failed',
                    'error'
                );
            } else {
                showToast(
                    err.response?.data?.message || 'Login failed',
                    'error'
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="text-center mb-4">
                    <h3 className="fw-bold">Welcome Back</h3>
                    <p className="text-muted">Login to your GOQii account</p>
                </div>

                {generalError && <div className="alert alert-danger">{generalError}</div>}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            {...register('email')}
                        />
                        {errors.email && (
                            <div className="text-danger small mt-1">{errors.email.message}</div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            {...register('password')}
                        />
                        {errors.password && (
                            <div className="text-danger small mt-1">{errors.password.message}</div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="text-center mt-3">
                    <Link to="/forgot-password" className="text-decoration-none small">Forgot Password?</Link>
                </div>

                <div className="text-center mt-3">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/register" className="text-decoration-none">Register</Link>
                </div>

                <div className="mt-3 p-2 bg-light rounded text-center">
                    <small className="text-muted">
                        <strong>Demo:</strong> admin@goqii.com / password123<br />
                        user@goqii.com / password123
                    </small>
                </div>
            </div>
        </div>
    );
};

export default Login;
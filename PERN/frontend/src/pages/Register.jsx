import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { registerSchema } from '../validations/registerValidation';
import PasswordInput from '../components/PasswordInput';

const Register = () => {
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register: registerUser } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setGeneralError('');
        try {
            await registerUser(data);
            showToast('Register successfully', 'success');
            navigate('/dashboard');
        } catch (err) {
            const data = err.response?.data;

            if (data?.errors) {
                const firstError = Object.values(data.errors)[0]?.[0];
                showToast(firstError || 'Registration failed', 'error');
            } else if (data?.error) {
                showToast(data.error, 'error');
            } else if (data?.message) {
                showToast(data.message, 'error');
            } else {
                showToast('Registration failed', 'error');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="text-center mb-4">
                    <h3 className="fw-bold">Create Account</h3>
                    <p className="text-muted">Join GOQii Task Manager</p>
                </div>

                {generalError && <div className="alert alert-danger">{generalError}</div>}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            {...register('name')}
                        />
                        {errors.name && (
                            <div className="text-danger small mt-1">{errors.name.message}</div>
                        )}
                    </div>

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

                    <PasswordInput
                        label="Password"
                        placeholder="Password"
                        registration={register('password')}
                        error={errors.password}
                        className="mb-3"
                    />

                    <PasswordInput
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        registration={register('password_confirmation')}
                        error={errors.password_confirmation}
                        className="mb-4"
                    />

                    <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={loading}>
                        {loading ? 'Creating...' : 'Register'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="text-decoration-none">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';
import { useToast } from '../context/ToastContext';

const schema = yup.object({
    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),
}).required();

const ForgotPassword = () => {
    const [success, setSuccess] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
        },
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setGeneralError('');
        setSuccess('');

        try {
            const res = await api.post('/forgot-password', data);

            setSuccess(res.data.message);

            showToast(
                res.data.message,
                'success'
            );

            // Clear email field
            reset();

        } catch (err) {
            setSuccess('');
            setGeneralError('');

            showToast(
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Failed to send reset link',
                'error'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">

                <div className="text-center mb-4">
                    <h3 className="fw-bold">
                        Forgot Password?
                    </h3>

                    <p className="text-muted">
                        Enter your email to receive reset link
                    </p>
                </div>

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                {generalError && (
                    <div className="alert alert-danger">
                        {generalError}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    <div className="mb-4">
                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''
                                }`}
                            {...register('email')}
                        />

                        {errors.email && (
                            <div className="text-danger small mt-1">
                                {errors.email.message}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 btn-lg"
                        disabled={loading}
                    >
                        {loading
                            ? 'Sending...'
                            : 'Send Reset Link'}
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link
                        to="/login"
                        className="text-decoration-none"
                    >
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;
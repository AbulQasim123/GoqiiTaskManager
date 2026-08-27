import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { forgotPasswordSchema } from '../validations/forgotPasswordValidation';
import PasswordInput from '../components/PasswordInput';


const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [success, setSuccess] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    useEffect(() => {
        if (!token || !email) {
            setGeneralError('Invalid or missing reset link');
        }
    }, [token, email]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data) => {
        if (!token || !email) return;

        setLoading(true);
        setGeneralError('');
        setSuccess('');

        try {
            await api.post('/reset-password', {
                email,
                token,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });
            setSuccess('Password reset successfully! Redirecting to login...');
            showToast('Password reset successfully', 'success');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            showToast(err.response?.data?.error || 'Failed to reset password', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">
                <div className="text-center mb-4">
                    <h3 className="fw-bold">Reset Password</h3>
                    <p className="text-muted">Create a new password for {email}</p>
                </div>

                {success && <div className="alert alert-success">{success}</div>}
                {generalError && <div className="alert alert-danger">{generalError}</div>}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <PasswordInput
                        label="New Password"
                        placeholder="New Password"
                        registration={register('password')}
                        error={errors.password}
                        className="mb-3"
                    />

                    <PasswordInput
                        label="Confirm New Password"
                        placeholder="Confirm New Password"
                        registration={register('password_confirmation')}
                        error={errors.password_confirmation}
                        className="mb-4"
                    />

                    <button
                        type="submit"
                        className="btn btn-primary w-100 btn-lg"
                        disabled={loading || !token || !email}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>

                </form>

                <div className="text-center mt-4">
                    <Link to="/login" className="text-decoration-none">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
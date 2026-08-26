import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import api from '../services/api';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';

const schema = yup.object({
    name: yup
        .string()
        .min(3, 'Name must be at least 3 characters')
        .max(255, 'Name is too long')
        .required('Name is required'),

    email: yup
        .string()
        .email('Invalid email')
        .required('Email is required'),

    password: yup
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .min(6, 'Password must be at least 6 characters'),

    password_confirmation: yup
        .string()
        .transform((value) => (value === '' ? null : value))
        .nullable()
        .oneOf([yup.ref('password')], 'Passwords must match'),
}).required();


const Profile = () => {
    const { showToast } = useToast();
    const { user } = useAuth();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const fetchProfile = async () => {
        setLoading(true);

        try {
            const res = await api.get('/profile');

            const profile = res.data.data;

            reset({
                name: profile.name || '',
                email: profile.email || '',
                password: '',
                password_confirmation: '',
            });
        } catch (err) {
            showToast(
                err.response?.data?.message || 'Failed to load profile',
                'error'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const onSubmit = async (data) => {
        setSaving(true);

        try {
            const payload = {
                name: data.name,
                email: data.email,
            };

            if (data.password) {
                payload.password = data.password;
                payload.password_confirmation =
                    data.password_confirmation;
            }

            const res = await api.put('/profile', payload);

            reset({
                name: res.data.data.name,
                email: res.data.data.email,
                password: '',
                password_confirmation: '',
            });

            showToast(
                res.data.message || 'Profile updated successfully',
                'success'
            );
        } catch (err) {
            const response = err.response?.data;

            if (response?.errors) {
                const firstError =
                    Object.values(response.errors)[0]?.[0];

                showToast(
                    firstError || 'Profile update failed',
                    'error'
                );
            } else {
                showToast(
                    response?.message ||
                    response?.error ||
                    'Profile update failed',
                    'error'
                );
            }
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border"></div>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">

                    <div className="card border-0 shadow-sm">

                        <div className="card-header bg-white py-3">
                            <h5 className="mb-1 fw-bold">
                                <i className="bi bi-person-circle me-2 text-primary"></i>
                                My Profile
                            </h5>

                            <small className="text-muted">
                                Update your personal information
                            </small>
                        </div>

                        <div className="card-body p-4">

                            <form onSubmit={handleSubmit(onSubmit)}>

                                {/* Name */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Name
                                    </label>

                                    <input
                                        type="text"
                                        className={`form-control ${errors.name
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                        {...register('name')}
                                    />

                                    {errors.name && (
                                        <div className="invalid-feedback">
                                            {errors.name.message}
                                        </div>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label className="form-label">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        className={`form-control ${errors.email
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                        {...register('email')}
                                    />

                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email.message}
                                        </div>
                                    )}
                                </div>

                                <hr className="my-4" />

                                <h6 className="fw-bold mb-3">
                                    Change Password
                                </h6>

                                <div className="mb-3">
                                    <label className="form-label">
                                        New Password
                                    </label>

                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep current password"
                                        className={`form-control ${errors.password
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                        {...register('password')}
                                    />

                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password.message}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">
                                        Confirm New Password
                                    </label>

                                    <input
                                        type="password"
                                        className={`form-control ${errors.password_confirmation
                                            ? 'is-invalid'
                                            : ''
                                            }`}
                                        {...register(
                                            'password_confirmation'
                                        )}
                                    />

                                    {errors.password_confirmation && (
                                        <div className="invalid-feedback">
                                            {
                                                errors
                                                    .password_confirmation
                                                    .message
                                            }
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <i className="bi bi-check-lg me-2"></i>
                                            Update Profile
                                        </>
                                    )}
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
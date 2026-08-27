import React, { useState } from 'react';

const PasswordInput = ({
    label = 'Password',
    placeholder = 'Password',
    registration,
    error,
    className = '',
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={className}>
            <label className="form-label">{label}</label>

            <div className="position-relative">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className={`form-control pe-5 ${error ? 'is-invalid' : ''}`}
                    {...registration}
                />

                <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y border-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex="-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    <i
                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'
                            }`}
                    ></i>
                </button>
            </div>

            {error && (
                <div className="text-danger small mt-1">
                    {error.message}
                </div>
            )}
        </div>
    );
};

export default PasswordInput;
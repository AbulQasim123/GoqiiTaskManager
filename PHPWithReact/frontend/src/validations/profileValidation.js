import * as yup from 'yup';
export const profileSchema = yup.object({
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
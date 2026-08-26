const { z } = require('zod');

const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Name must be at least 2 characters.')
        .max(255, 'Name is too long.'),

    email: z
        .string()
        .trim()
        .email('Invalid email format.'),

    password: z
        .string()
        .min(6, 'Password must be at least 6 characters.'),

    password_confirmation: z
        .string()
        .min(1, 'Password confirmation is required.'),

    role: z
        .enum(['admin', 'user'])
        .optional(),
}).superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password_confirmation'],
            message: 'Passwords do not match.',
        });
    }
});

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email('Invalid email format.'),

    password: z
        .string()
        .min(1, 'Password is required.'),
});

const updateProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters.')
        .max(255, 'Name is too long.'),

    email: z
        .string()
        .trim()
        .email('Invalid email format.'),

    password: z
        .string()
        .min(6, 'Password must be at least 6 characters.')
        .optional()
        .or(z.literal('')),

    password_confirmation: z
        .string()
        .optional()
        .or(z.literal('')),
}).superRefine((data, ctx) => {
    if (data.password && data.password !== data.password_confirmation) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['password_confirmation'],
            message: 'Passwords do not match.',
        });
    }
});

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
};
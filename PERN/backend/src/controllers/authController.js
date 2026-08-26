const { User } = require('../models');
const { logAudit } = require('../utils/auditLogger');
const { generateToken } = require('../utils/jwtHelper');
const { authResponse } = require('../utils/responseHelper');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
    const { name, email, password, password_confirmation, role } = req.body;

    const errors = {};
    if (!name || name.trim().length < 2) errors.name = ['Name is required.'];
    if (!email) errors.email = ['Email is required.'];
    if (!password || password.length < 6) errors.password = ['Password must be at least 6 characters.'];
    if (password !== password_confirmation) errors.password_confirmation = ['Passwords do not match.'];

    if (Object.keys(errors).length > 0) throw ApiError.validation('Validation failed', errors);

    // Sequelize unique constraint will throw if email exists
    try {
        const user = await User.create({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password, // Auto-hashed by beforeSave hook
            role: role === 'admin' ? 'admin' : 'user',
        });

        // Audit log only after successful login

        await logAudit({
            userId: user.id,
            action: 'login',
            entityType: 'User',
            entityId: user.id,
            description: 'Admin logged in',
            ipAddress: req.ip,
        });

        const token = generateToken(user.id);
        return authResponse(res, token, user);
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            throw ApiError.conflict('Email already registered');
        }
        throw err;
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email.trim().toLowerCase(),
        },
    });

    // Wrong email
    if (!user) {
        throw ApiError.validation(
            'Invalid credentials',
            {
                email: ['Invalid credentials.'],
            }
        );
    }

    const isMatch = await user.comparePassword(password);

    // Wrong password
    if (!isMatch) {
        throw ApiError.validation(
            'Invalid credentials',
            {
                email: ['Invalid credentials.'],
            }
        );
    }

    // Audit log only after successful login

    await logAudit({
        userId: user.id,
        action: 'login',
        entityType: 'User',
        entityId: user.id,
        description: 'Admin logged in',
        ipAddress: req.ip,
    });

    const token = generateToken(user.id);

    return authResponse(res, token, user);
});

const me = asyncHandler(async (req, res) => {
    res.json(req.user);
});

const logout = asyncHandler(async (req, res) => {
    // if (req.user.isAdmin()) {
    await logAudit({
        userId: req.user.id,
        action: 'logout',
        entityType: 'User',
        entityId: req.user.id,
        description: 'Admin logged out',
        ipAddress: req.ip,
    });
    // }
    res.json({ message: 'Successfully logged out' });
});

const refresh = asyncHandler(async (req, res) => {
    const token = generateToken(req.user.id);
    return authResponse(res, token, req.user);
});

const profile = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt'],
    });

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    res.json({
        status: true,
        data: user,
    });
});

const updateProfile = asyncHandler(async (req, res) => {
    const { name, email, password, password_confirmation } = req.body;

    const errors = {};

    if (!name || name.trim().length < 3) {
        errors.name = ['Name must be at least 3 characters.'];
    }

    if (!email) {
        errors.email = ['Email is required.'];
    }

    if (password) {
        if (password.length < 6) {
            errors.password = [
                'Password must be at least 6 characters.',
            ];
        }

        if (password !== password_confirmation) {
            errors.password_confirmation = [
                'Passwords do not match.',
            ];
        }
    }

    if (Object.keys(errors).length > 0) {
        throw ApiError.validation(
            'Validation failed',
            errors
        );
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
        throw ApiError.notFound('User not found');
    }

    // Check email belongs to another user
    if (email.trim().toLowerCase() !== user.email) {
        const existingUser = await User.findOne({
            where: {
                email: email.trim().toLowerCase(),
            },
        });

        if (existingUser) {
            throw ApiError.conflict(
                'Email already registered'
            );
        }
    }

    user.name = name.trim();
    user.email = email.trim().toLowerCase();

    // Password only update if user entered it
    if (password) {
        user.password = password;
    }

    await user.save();

    await logAudit({
        userId: user.id,
        action: 'profile_update',
        entityType: 'User',
        entityId: user.id,
        description: password
            ? 'Profile and password updated'
            : 'Profile updated',
        ipAddress: req.ip,
    });

    res.json({
        status: true,
        message: 'Profile updated successfully',
        data: user,
    });
});

module.exports = {
    register,
    login,
    me,
    logout,
    refresh,
    profile,
    updateProfile,
};
const crypto = require('crypto');
const path = require('path');
const ejs = require('ejs');

const { User, PasswordReset } = require('../models');
const { sendEmail } = require('../config/mail');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// forot password
const forgot = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw ApiError.validation(
            'Validation failed',
            {
                email: ['Email is required.'],
            }
        );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await User.findOne({
        where: {
            email: normalizedEmail,
        },
    });

    // Wrong email
    if (!user) {
        throw ApiError.notFound(
            'No account found with this email address'
        );
    }

    // Generate raw token
    const rawToken = crypto
        .randomBytes(64)
        .toString('hex');

    // Hash token before saving
    const hashedToken = crypto
        .createHash('sha256')
        .update(rawToken)
        .digest('hex');

    // Remove previous token
    await PasswordReset.destroy({
        where: {
            email: normalizedEmail,
        },
    });

    // Create new reset token
    await PasswordReset.create({
        email: normalizedEmail,
        token: hashedToken,
        created_at: new Date(),
    });

    // Create reset URL
    const resetUrl =
        `${process.env.FRONTEND_URL}/reset-password` +
        `?token=${rawToken}` +
        `&email=${encodeURIComponent(normalizedEmail)}`;

    try {
        // EJS template
        const templatePath = path.join(
            __dirname,
            '../views/emails/password-reset.ejs'
        );

        const html = await ejs.renderFile(
            templatePath,
            {
                name: user.name,
                resetUrl,
            }
        );

        // Send email
        const mailResult = await sendEmail({
            to: user.email,
            subject: 'Password Reset Request - GOQii Task Manager',
            text: `Click here to reset your password: ${resetUrl}`,
            html,
        });

        console.log(
            'Password reset email sent:',
            mailResult.messageId
        );

    } catch (err) {
        console.error(
            'Password reset email failed:',
            err
        );

        // Delete token if email failed
        await PasswordReset.destroy({
            where: {
                email: normalizedEmail,
            },
        });

        throw ApiError.badRequest(
            'Unable to send password reset email'
        );
    }

    return res.json({
        message: 'Password reset link sent to your email',
    });
});


// reset password
const reset = asyncHandler(async (req, res) => {
    const {
        email,
        token,
        password,
        password_confirmation,
    } = req.body;

    const errors = {};

    if (!email) {
        errors.email = ['Email is required.'];
    }

    if (!token) {
        errors.token = ['Token is required.'];
    }

    if (!password || password.length < 6) {
        errors.password = [
            'Password must be at least 6 characters.',
        ];
    }

    if (password !== password_confirmation) {
        errors.password_confirmation = [
            'Passwords do not match.',
        ];
    }

    if (Object.keys(errors).length > 0) {
        throw ApiError.validation(
            'Validation failed',
            errors
        );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find reset token
    const record = await PasswordReset.findOne({
        where: {
            email: normalizedEmail,
        },
    });

    if (!record) {
        throw ApiError.badRequest(
            'Invalid or expired reset token'
        );
    }

    // Hash received token
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    // Check token
    if (record.token !== hashedToken) {
        throw ApiError.badRequest(
            'Invalid or expired reset token'
        );
    }

    // Check expiry - 60 minutes
    const diffMinutes =
        (new Date() - new Date(record.created_at))
        / (1000 * 60);

    if (diffMinutes > 60) {
        await PasswordReset.destroy({
            where: {
                email: normalizedEmail,
            },
        });

        throw ApiError.badRequest(
            'Reset token expired'
        );
    }

    // Find user
    const user = await User.findOne({
        where: {
            email: normalizedEmail,
        },
    });

    if (!user) {
        throw ApiError.notFound(
            'User not found'
        );
    }

    // User model already has beforeSave hook
    // which hashes the password.
    user.password = password;

    await user.save();

    // Delete used token
    await PasswordReset.destroy({
        where: {
            email: normalizedEmail,
        },
    });

    return res.json({
        message: 'Password reset successfully',
    });
});


module.exports = {
    forgot,
    reset,
};
const ApiError = require('../utils/ApiError');

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        const response = { message: err.message };
        if (err.errors) response.errors = err.errors;
        return res.status(err.statusCode).json(response);
    }

    if (err.code === '23505') {
        return res.status(409).json({ message: 'Resource already exists', error: err.detail });
    }
    if (err.code === '23503') {
        return res.status(422).json({ message: 'Referenced resource does not exist' });
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }

    console.error('Unhandled error:', err);
    return res.status(500).json({
        message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
    });
};

module.exports = errorHandler;
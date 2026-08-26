const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
    message: { message: 'Too many requests from this IP, please try again later.' },
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many authentication attempts, please try again after 15 minutes.' },
    skipSuccessfulRequests: true,
});

module.exports = { apiLimiter, authLimiter };
const ApiError = require('../utils/ApiError');

const requireAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        throw ApiError.forbidden('Forbidden - Admin only');
    }
    next();
};

module.exports = { requireAdmin };
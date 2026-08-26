const { User } = require('../models');
const { verifyToken, extractBearerToken } = require('../utils/jwtHelper');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const authenticate = asyncHandler(async (req, res, next) => {
    const token = extractBearerToken(req.headers.authorization);
    if (!token) throw ApiError.unauthorized('No token provided');

    const decoded = verifyToken(token);

    const user = await User.findByPk(decoded.userId, {
        attributes: ['id', 'name', 'email', 'role', 'created_at', 'updated_at'],
    });

    if (!user) throw ApiError.unauthorized('User not found');

    req.user = user;
    next();
});

module.exports = { authenticate };
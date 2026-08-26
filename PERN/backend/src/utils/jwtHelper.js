const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "60m";

const generateToken = (userId, expiresIn = JWT_EXPIRES_IN) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

const extractBearerToken = (authHeader) => {
    if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
    return authHeader.split(" ")[1];
};

module.exports = { generateToken, verifyToken, extractBearerToken };

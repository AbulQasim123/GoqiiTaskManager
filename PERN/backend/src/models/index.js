const { Sequelize } = require('sequelize');
const config = require('../config/database.js')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: config.logging,
        pool: config.pool,
        define: config.define,
        dialectOptions: config.dialectOptions || {},
    }
);

// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Task = require('./Task')(sequelize, Sequelize.DataTypes);
const AuditLog = require('./AuditLog')(sequelize, Sequelize.DataTypes);
const PasswordReset = require('./PasswordReset')(sequelize, Sequelize.DataTypes);

// Define relationships 
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });

User.hasMany(AuditLog, { foreignKey: 'user_id', as: 'auditLogs', onDelete: 'CASCADE' });
AuditLog.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });

// Export
const db = {
    sequelize,
    Sequelize,
    User,
    Task,
    AuditLog,
    PasswordReset,
};

module.exports = db;
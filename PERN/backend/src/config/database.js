require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'task_manager',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 20,
            min: 2,
            acquire: 30000,
            idle: 10000,
        },
        define: {
            timestamps: true,
            underscored: true,          // created_at instead of createdAt
            freezeTableName: true,      // Don't pluralize
        },
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 5432,
        dialect: 'postgres',
        logging: false,
        pool: { max: 20, min: 2, acquire: 30000, idle: 10000 },
        define: { timestamps: true, underscored: true, freezeTableName: true },
        dialectOptions: {
            ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false,
        },
    },
};
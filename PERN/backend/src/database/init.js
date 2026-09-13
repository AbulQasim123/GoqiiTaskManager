require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];

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
        dialectOptions: config.dialectOptions,
    }
);

const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection successful.');

        const sql = fs.readFileSync(
            path.join(__dirname, 'init.sql'),
            'utf8'
        );

        await sequelize.query(sql);

        console.log('Database initialized successfully!');

        await sequelize.close();
        process.exit(0);
    } catch (err) {
        console.error('Database initialization failed:', err.message);
        await sequelize.close();
        process.exit(1);
    }
};

init();


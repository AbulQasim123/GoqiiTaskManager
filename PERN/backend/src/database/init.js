require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { pool, testConnection } = require('../src/config/database');

const init = async () => {
    try {
        const connected = await testConnection();
        if (!connected) process.exit(1);

        const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
        await pool.query(sql);
        console.log('Database initialized successfully!');
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('Database initialization failed:', err.message);
        process.exit(1);
    }
};

init();
'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
    up: async (queryInterface) => {
        const hashedPassword = await bcrypt.hash('password123', 12);

        await queryInterface.bulkInsert('users', [
            { name: 'Admin User', email: 'admin@goqii.com', password: hashedPassword, role: 'admin', created_at: new Date(), updated_at: new Date() },
            { name: 'Test User', email: 'user@goqii.com', password: hashedPassword, role: 'user', created_at: new Date(), updated_at: new Date() },
        ]);

        await queryInterface.bulkInsert('tasks', [
            { user_id: 1, title: 'Setup project repository', description: 'Initialize Git repo', status: 'done', priority: 'high', due_date: '2026-08-15', created_at: new Date(), updated_at: new Date() },
            { user_id: 1, title: 'Design database schema', description: 'Create ERD', status: 'done', priority: 'high', due_date: '2026-08-18', created_at: new Date(), updated_at: new Date() },
            { user_id: 2, title: 'Fix responsive navbar', description: 'Mobile sidebar fix', status: 'in-progress', priority: 'medium', due_date: '2026-08-29', created_at: new Date(), updated_at: new Date() },
        ]);

        await queryInterface.bulkInsert('audit_logs', [
            { user_id: 1, action: 'login', entity_type: 'User', entity_id: 1, description: 'Admin logged in', ip_address: '127.0.0.1', created_at: new Date(), updated_at: new Date() },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('audit_logs', null, {});
        await queryInterface.bulkDelete('tasks', null, {});
        await queryInterface.bulkDelete('users', null, {});
    },
};
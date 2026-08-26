'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tasks', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE',
            },
            title: { type: Sequelize.STRING(255), allowNull: false },
            description: { type: Sequelize.TEXT, allowNull: true },
            status: { type: Sequelize.ENUM('todo', 'in-progress', 'done'), defaultValue: 'todo' },
            priority: { type: Sequelize.ENUM('low', 'medium', 'high'), defaultValue: 'medium' },
            due_date: { type: Sequelize.DATEONLY, allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        });

        await queryInterface.addIndex('tasks', ['user_id', 'status']);
        await queryInterface.addIndex('tasks', ['due_date']);
        await queryInterface.addIndex('tasks', ['priority']);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('tasks');
    },
};
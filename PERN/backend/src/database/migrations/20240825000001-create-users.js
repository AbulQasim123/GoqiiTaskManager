'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: { type: Sequelize.STRING(255), allowNull: false },
            email: { type: Sequelize.STRING(255), allowNull: false, unique: true },
            email_verified_at: { type: Sequelize.DATE, allowNull: true },
            password: { type: Sequelize.STRING(255), allowNull: false },
            role: { type: Sequelize.ENUM('admin', 'user'), defaultValue: 'user' },
            remember_token: { type: Sequelize.STRING(100), allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        });

        await queryInterface.addIndex('users', ['role']);
        await queryInterface.addIndex('users', ['email']);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('users');
    },
};
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('password_reset_tokens', {
            email: { type: Sequelize.STRING(255), primaryKey: true },
            token: { type: Sequelize.STRING(255), allowNull: false },
            created_at: { type: Sequelize.DATE, allowNull: true },
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('password_reset_tokens');
    },
};
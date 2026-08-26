'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('audit_logs', {
            id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE',
            },
            action: { type: Sequelize.STRING(50), allowNull: false },
            entity_type: { type: Sequelize.STRING(50), allowNull: true },
            entity_id: { type: Sequelize.INTEGER, allowNull: true },
            description: { type: Sequelize.TEXT, allowNull: true },
            old_values: { type: Sequelize.JSONB, allowNull: true },
            new_values: { type: Sequelize.JSONB, allowNull: true },
            ip_address: { type: Sequelize.STRING(45), allowNull: true },
            created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
            updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
        });

        await queryInterface.addIndex('audit_logs', ['user_id', 'action']);
        await queryInterface.addIndex('audit_logs', ['entity_type']);
        await queryInterface.addIndex('audit_logs', ['created_at']);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('audit_logs');
    },
};
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AuditLog extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
        }
    }

    AuditLog.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
                onDelete: 'CASCADE',
            },
            action: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            entity_type: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            entity_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            ip_address: {
                type: DataTypes.STRING(45),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'AuditLog',
            tableName: 'audit_logs',
            timestamps: true,
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            indexes: [
                { fields: ['user_id', 'action'] },
                { fields: ['entity_type'] },
                { fields: ['created_at'] },
                { fields: ['action'] },
            ],
        }
    );

    return AuditLog;
};
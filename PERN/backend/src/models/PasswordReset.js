const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PasswordReset extends Model { }

    PasswordReset.init(
        {
            email: {
                type: DataTypes.STRING(255),
                primaryKey: true,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'PasswordReset',
            tableName: 'password_reset_tokens',
            timestamps: false,          // We manage created_at manually
            underscored: true,
        }
    );

    return PasswordReset;
};
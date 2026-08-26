const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
    
        isAdmin() {
            return this.role === 'admin';
        }

        async comparePassword(plainPassword) {
            return bcrypt.compare(plainPassword, this.password);
        }

        async hashPassword() {
            if (this.changed('password')) {
                this.password = await bcrypt.hash(this.password, 12);
            }
        }

        toJSON() {
            const values = { ...this.get() };
            delete values.password;
            return values;
        }

        static associate(models) {
            // Defined in index.js
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    len: { args: [2, 255], msg: 'Name must be between 2 and 255 characters' },
                },
            },
            email: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: { msg: 'Email already registered' },
                validate: {
                    isEmail: { msg: 'Invalid email format' },
                },
            },
            email_verified_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    len: { args: [6, 255], msg: 'Password must be at least 6 characters' },
                },
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                defaultValue: 'user',
                allowNull: false,
            },
            remember_token: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,           // createdAt, updatedAt
            underscored: true,          // created_at, updated_at
            hooks: {
                beforeSave: async (user) => {
                    if (user.changed('password')) {
                        user.password = await bcrypt.hash(user.password, 12);
                    }
                },
            },
            indexes: [
                { fields: ['role'] },
                { fields: ['email'] },
            ],
        }
    );

    return User;
};
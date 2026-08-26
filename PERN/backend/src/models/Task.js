const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
    
        static async scopeWithStatus(status) {
            if (!status) return this.findAll();
            return this.findAll({ where: { status } });
        }

        // Format for API response
        toJSON() {
            const values = { ...this.get() };
            // Include user relation if loaded
            if (this.user) {
                values.user = this.user.toJSON ? this.user.toJSON() : this.user;
            }
            return values;
        }

        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
        }
    }

    Task.init(
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
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    len: { args: [3, 255], msg: 'Title must be between 3 and 255 characters' },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('todo', 'in-progress', 'done'),
                defaultValue: 'todo',
                allowNull: false,
            },
            priority: {
                type: DataTypes.ENUM('low', 'medium', 'high'),
                defaultValue: 'medium',
                allowNull: false,
            },
            due_date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Task',
            tableName: 'tasks',
            timestamps: true,
            underscored: true,
            
            indexes: [
                { fields: ['user_id', 'status'] },
                { fields: ['due_date'] },
                { fields: ['priority'] },
                { fields: ['status'] },
            ],
        }
    );

    return Task;
};
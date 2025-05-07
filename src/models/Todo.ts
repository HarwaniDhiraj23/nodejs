import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/index';

interface TodoAttributes {
    id: number;
    title: string;
    description?: string | null;
    completed?: boolean;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id' | 'description' | 'completed' | 'createdAt' | 'updatedAt'> { }

class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoAttributes {
    public id!: number;
    public title!: string;
    public description?: string | null;
    public completed?: boolean;
    public userId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        Todo.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        });
    }
}

Todo.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'todos',
        modelName: 'Todo',
        timestamps: true,
    }
);

export default Todo;

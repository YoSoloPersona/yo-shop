import { Model, DataTypes, CreationOptional } from 'sequelize';
import { User, Role } from '@YoSoloPersona/yo-shop-model';

// locals
import { sequelize } from '../sequelize';

/** User model */
export class ModelUser extends Model<User, User> implements User {
    declare id: CreationOptional<number>;

    /**
     * Email
     */
    declare email: string;

    /**
     * Role
     */
    declare role: Role;

    /**
     * Password
     */
    declare password: string;
}

ModelUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'users'
    }
);

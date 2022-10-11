import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
    WhereOptions
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Типы пользователей. */
export type Role = 'root' | 'user' | 'admin';

/** Пользователь. */
export type User = InferAttributes<ModelUser>;

/** Фильтр для получения пользователей. */
export type FilterUser = WhereOptions<User>;

/** Модель пользователя. */
export class ModelUser extends Model<
    User,
    InferCreationAttributes<ModelUser>
> {
    declare id: CreationOptional<number>;

    /** Электронаня почта. */
    declare email: string;

    /** Тип. */
    declare role: Role;

    /** Хэш пароля. */
    declare password: string;
}

// Инициализируем в БД
ModelUser.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: 'user' }
    },
    {
        sequelize, // Ссылка на БД для инициализации
        tableName: 'users' // Имя таблицы
    }
);

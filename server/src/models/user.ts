import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    FindOptions,
    WhereOptions,
    DataTypes
} from 'sequelize';
import { User, Role } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Параметры поиска пользователей. */
export type FindUser = FindOptions<InferAttributes<ModelUser>>;

/** Параметры поиска пользователей. */
export type WhereUser = WhereOptions<InferAttributes<ModelUser>>;

/** Модель пользователя. */
export class ModelUser
    extends Model<
        InferAttributes<ModelUser>,
        InferCreationAttributes<ModelUser>
    >
    implements User
{
    declare id?: number;

    /** Электронная почта. */
    declare email: string;

    /** Тип. */
    declare role: Role;

    /** Хэш пароля. */
    declare password: string;
}

ModelUser.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        role: { type: DataTypes.STRING, defaultValue: 'user' },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    },
    {
        sequelize, // Ссылка на БД для инициализации
        tableName: 'users' // Имя таблицы
    }
);

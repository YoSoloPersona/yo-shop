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
export type OptionalUser = Optional<
    InferCreationAttributes<
        ModelUser,
        {
            omit: never;
        }
    >,
    'id'
>;

/** Фильтр для получения пользователей. */
export type FilterUser = WhereOptions<
    InferAttributes<
        ModelUser,
        {
            omit: never;
        }
    >
>;

/** Модель пользователя. */
export class ModelUser extends Model<
    InferAttributes<ModelUser>,
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

ModelUser.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        email: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.STRING, defaultValue: 'user' }
    },
    {
        sequelize,
        tableName: 'users'
    }
);

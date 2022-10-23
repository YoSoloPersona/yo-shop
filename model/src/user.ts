import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model,
    WhereOptions
} from 'sequelize';

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
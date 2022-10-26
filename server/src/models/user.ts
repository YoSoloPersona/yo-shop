import {
    InferAttributes,
    CreationOptional,
    InferCreationAttributes,
    Model,
    WhereOptions
} from 'sequelize';
import { User, Role } from 'yo-shop-model';

/** Фильтр для получения пользователей. */
export type FilterUser = WhereOptions<User>;

/** Модель пользователя. */
export class ModelUser
    extends Model<
        InferAttributes<ModelUser>,
        InferCreationAttributes<ModelUser>
    >
    implements User
{
    declare id?: CreationOptional<number>;

    /** Электронаня почта. */
    declare email: string;

    /** Тип. */
    declare role: Role;

    /** Хэш пароля. */
    declare password: string;
}

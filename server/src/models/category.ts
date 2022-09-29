import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes,
    FindOptions,
    Optional
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

export type FindCategory = FindOptions<
    InferAttributes<ModelCategory, { omit: never }>
>;

/** Пользователь. */
export type OptionalCategory = Optional<
    InferCreationAttributes<
        ModelCategory,
        {
            omit: never;
        }
    >,
    'id'
>;

/** Категория продуктов. */
export class ModelCategory extends Model<
    InferAttributes<ModelCategory>,
    InferCreationAttributes<ModelCategory>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Наименование. */
    declare name: string;
}

ModelCategory.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    {
        sequelize,
        tableName: 'category'
    }
);

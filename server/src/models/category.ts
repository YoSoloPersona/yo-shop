import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes,
    FindOptions
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

export type FindCategory = FindOptions<
    InferAttributes<ModelCategory, { omit: never }>
>;

/** Категория продуктов. */
export type Category = InferAttributes<ModelCategory>;

/** Категория продуктов. */
export class ModelCategory extends Model<
    Category,
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

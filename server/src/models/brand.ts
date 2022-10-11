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

export type FindBrand = FindOptions<
    InferAttributes<ModelBrand, { omit: never }>
>;

/** Бренд. */
export type Brand = InferAttributes<ModelBrand>;

/** Модель бренда. */
export class ModelBrand extends Model<
    Brand,
    InferCreationAttributes<ModelBrand>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Наименование. */
    declare name: string;
}

ModelBrand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    { sequelize, tableName: 'brand' }
);

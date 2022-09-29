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

/** Пользователь. */
export type OptionalBrand = Optional<
    InferCreationAttributes<
        ModelBrand,
        {
            omit: never;
        }
    >,
    never
>;

/** Модель бренда. */
export class ModelBrand extends Model<
    InferAttributes<ModelBrand>,
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

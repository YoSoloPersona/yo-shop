import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    FindOptions,
    WhereOptions,
    DataTypes
} from 'sequelize';
import { TypeBrand } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Параметры поиска типов брэнда. */
export type FindTypeBrand = FindOptions<InferAttributes<ModelTypeBrand>>;

/** Параметры поиска типов брэнда. */
export type WhereTypeBrand = WhereOptions<InferAttributes<ModelTypeBrand>>;

/** Модель типа бренда. */
export class ModelTypeBrand
    extends Model<
        InferAttributes<ModelTypeBrand>,
        InferCreationAttributes<ModelTypeBrand>
    >
    implements TypeBrand
{
    declare id: number;
}

// Инициализация в БД.
ModelTypeBrand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    {
        sequelize,
        tableName: 'typeBrand'
    }
);

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

export type FindProduct = FindOptions<
    InferAttributes<ModelProduct, { omit: never }>
>;

/** Продукт. */
export type Product = InferAttributes<ModelProduct>;

/** Модель продукта. */
export class ModelProduct extends Model<
Product,
    InferCreationAttributes<ModelProduct>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Наименование. */
    declare name: string;

    /** Цена. */
    declare price: string;

    /** Рейтинг. */
    declare rating: number;

    /** Картинка. */
    declare img: string;
}

ModelProduct.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        price: { type: DataTypes.STRING, unique: true, allowNull: false },
        rating: { type: DataTypes.INTEGER, defaultValue: 0 },
        img: { type: DataTypes.STRING, unique: true, allowNull: false }
    },
    { sequelize, tableName: 'product' }
);

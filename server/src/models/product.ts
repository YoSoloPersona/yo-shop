import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    FindOptions,
    WhereOptions,
    DataTypes
} from 'sequelize';
import { Product } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Параметры поиска продукта. */
export type FindProduct = FindOptions<ModelProduct>;

/** Параметры поиска продукта. */
export type WhereProduct = WhereOptions<ModelProduct>;

/** Модель продукта. */
export class ModelProduct
    extends Model<
        InferAttributes<ModelProduct>,
        InferCreationAttributes<ModelProduct>
    >
    implements Product
{
    /** Идентификатор в БД. */
    declare id?: number;

    /** Наименование. */
    declare name: string;

    /** Цена. */
    declare price: string;

    /** Рейтинг. */
    declare rating: number;

    /** Картинка. */
    declare img: string;
}

/** Инициализация в БД. */
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

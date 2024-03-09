import { Model, DataTypes } from 'sequelize';
import { Product } from '@YoSoloPersona/yo-shop-model';

// local
import { sequelize } from '../';

/** Модель продукта. */
export class ModelProduct extends Model<Product, Product> implements Product {
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
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        img: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    },
    { sequelize, tableName: 'product' }
);

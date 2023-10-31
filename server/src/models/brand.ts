import { Model, DataTypes } from 'sequelize';
import { Brand } from 'yo-shop-model';

// local
import { sequelize } from '../db';

/** Модель брэнда. */
export class ModelBrand extends Model<Brand, Brand> implements Brand {
    /** Идентификатор в БД. */
    declare id?: number;

    /** Наименование. */
    declare name: string;
}

// Инициализация в БД.
ModelBrand.init(
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
        }
    },
    { sequelize, tableName: 'brand' }
);

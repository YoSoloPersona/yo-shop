import { Model, DataTypes } from 'sequelize';
import { TypeBrand } from 'yo-shop-model';

// local
import { sequelize } from '../db';

/** Модель типа бренда. */
export class ModelTypeBrand
    extends Model<TypeBrand, TypeBrand>
    implements TypeBrand
{
    declare id: number;
}

// Инициализация в БД.
ModelTypeBrand.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    {
        sequelize,
        tableName: 'typeBrand'
    }
);

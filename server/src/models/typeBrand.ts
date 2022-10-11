import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Тип бренда. */
export type TypeBrand = InferAttributes<ModelTypeBrand>;

/** Модель типа бренда. */
export class ModelTypeBrand extends Model<
    TypeBrand,
    InferCreationAttributes<ModelTypeBrand>
> {
    declare id: CreateOptions<number>;
}

ModelTypeBrand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    {
        sequelize,
        tableName: 'typeBrand'
    }
);

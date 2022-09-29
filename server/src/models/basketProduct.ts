import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/**  */
export class ModelBasketProducts extends Model<
    InferAttributes<ModelBasketProducts>,
    InferCreationAttributes<ModelBasketProducts>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;
}

ModelBasketProducts.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, tableName: 'basketProducts' }
);

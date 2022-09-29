import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
    WhereOptions
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Корзина. */
export class ModelBasket extends Model<
    InferAttributes<ModelBasket>,
    InferCreationAttributes<ModelBasket>
> {
    /** Идентификатор в БД. */
    declare id: CreationOptional<number>;
}

ModelBasket.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, tableName: 'basket' }
);

import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Карзина продуктов. */
export type BasketProducts = InferAttributes<ModelBasketProducts>;

/** Модель карзины продуктов. */
export class ModelBasketProducts extends Model<
    BasketProducts,
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

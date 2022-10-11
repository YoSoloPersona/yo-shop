import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Корзина. */
export type Basket = InferAttributes<ModelBasket>;

/** Модель корзины. */
export class ModelBasket extends Model<
    Basket,
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

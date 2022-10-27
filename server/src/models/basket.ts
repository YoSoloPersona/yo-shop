import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import { Basket } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Модель корзины. */
export class ModelBasket
    extends Model<
        InferAttributes<ModelBasket>,
        InferCreationAttributes<ModelBasket>
    >
    implements Basket
{
    /** Идентификатор в БД. */
    declare id: number;
}

/** Инициализация в БД. */
ModelBasket.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, tableName: 'basket' }
);

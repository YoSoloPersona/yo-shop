import {
    DataTypes,
    Model
} from 'sequelize';
import { Basket } from 'yo-shop-model';

// local
import { sequelize } from '../db';

/** Модель корзины. */
export class ModelBasket extends Model<Basket, Basket> implements Basket {
    /** Идентификатор в БД. */
    declare id: number;
}

/** Инициализация в БД. */
ModelBasket.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    { sequelize, tableName: 'basket' }
);

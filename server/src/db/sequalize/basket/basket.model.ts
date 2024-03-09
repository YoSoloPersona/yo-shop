import { DataTypes, Model } from 'sequelize';
import { Cart } from '@YoSoloPersona/yo-shop-model';

// local
import { sequelize } from '../';

/** Модель корзины. */
export class ModelCart extends Model<Cart, Cart> implements Cart {
    /** Идентификатор в БД. */
    declare id: number;
}

/** Инициализация в БД. */
ModelCart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    },
    { sequelize, tableName: 'basket' }
);

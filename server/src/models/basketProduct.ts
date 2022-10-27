import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    DataTypes
} from 'sequelize';
import { BasketProducts } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Модель карзины продуктов. */
export class ModelBasketProducts
    extends Model<
        InferAttributes<ModelBasketProducts>,
        InferCreationAttributes<ModelBasketProducts>
    >
    implements BasketProducts
{
    /** Идентификатор в БД. */
    declare id: number;
}

/** Инициализация в БД. */
ModelBasketProducts.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    { sequelize, tableName: 'basketProducts' }
);

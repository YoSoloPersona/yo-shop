import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import { Basket } from 'yo-shop-model';

/** Модель корзины. */
export class ModelBasket
    extends Model<
        InferAttributes<ModelBasket>,
        InferCreationAttributes<ModelBasket>
    >
    implements Basket
{
    /** Идентификатор в БД. */
    declare id: CreationOptional<number>;
}

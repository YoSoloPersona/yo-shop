import {
    CreationOptional,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';

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
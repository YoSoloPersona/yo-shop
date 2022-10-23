import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';


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
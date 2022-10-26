import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';
import { BasketProducts } from 'yo-shop-model';

/** Модель карзины продуктов. */
export class ModelBasketProducts
    extends Model<
        InferAttributes<ModelBasketProducts>,
        InferCreationAttributes<ModelBasketProducts>
    >
    implements BasketProducts
{
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;
}

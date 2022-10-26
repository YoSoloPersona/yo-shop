import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';
import { Product } from 'yo-shop-model';

export type FindProduct = FindOptions<
    InferAttributes<ModelProduct, { omit: never }>
>;
/** Модель продукта. */
export class ModelProduct
    extends Model<
        InferAttributes<ModelProduct>,
        InferCreationAttributes<ModelProduct>
    >
    implements Product
{
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Наименование. */
    declare name: string;

    /** Цена. */
    declare price: string;

    /** Рейтинг. */
    declare rating: number;

    /** Картинка. */
    declare img: string;
}

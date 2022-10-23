import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';

export type FindProduct = FindOptions<
    InferAttributes<ModelProduct, { omit: never }>
>;

/** Продукт. */
export type Product = InferAttributes<ModelProduct>;

/** Модель продукта. */
export class ModelProduct extends Model<
Product,
    InferCreationAttributes<ModelProduct>
> {
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

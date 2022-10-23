import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';

/** Описание продукта. */
export type ProductInfo = InferAttributes<ModelProductInfo>;

/** Модель описания продукта. */
export class ModelProductInfo extends Model<
    ProductInfo,
    InferCreationAttributes<ModelProductInfo>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Заголовок. */
    declare title: string;

    /** Описание. */
    declare description: string;
}
import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';
import { ProductInfo } from 'yo-shop-model';

/** Модель описания продукта. */
export class ModelProductInfo
    extends Model<
        InferAttributes<ModelProductInfo>,
        InferCreationAttributes<ModelProductInfo>
    >
    implements ProductInfo
{
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Заголовок. */
    declare title: string;

    /** Описание. */
    declare description: string;
}

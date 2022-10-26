import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';
import { Category } from 'yo-shop-model';

export type FindCategory = FindOptions<
    InferAttributes<ModelCategory, { omit: never }>
>;

/** Модель категории продуктов. */
export class ModelCategory
    extends Model<
        InferAttributes<ModelCategory>,
        InferCreationAttributes<ModelCategory>
    >
    implements Category
{
    /** Идентификатор в БД. */
    declare id?: CreateOptions<number>;

    /** Наименование. */
    declare name: string;
}

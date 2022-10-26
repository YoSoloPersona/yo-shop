import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';

export type FindCategory = FindOptions<
    InferAttributes<ModelCategory, { omit: never }>
>;

/** Категория продуктов. */
export type Category = InferAttributes<ModelCategory>;

/** Категория продуктов. */
export class ModelCategory extends Model<
    Category,
    InferCreationAttributes<ModelCategory>
> {
    /** Идентификатор в БД. */
    declare id?: CreateOptions<number>;

    /** Наименование. */
    declare name: string;
}
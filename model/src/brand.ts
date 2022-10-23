import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';

export type FindBrand = FindOptions<
    InferAttributes<ModelBrand, { omit: never }>
>;

/** Бренд. */
export type Brand = InferAttributes<ModelBrand>;

/** Модель бренда. */
export class ModelBrand extends Model<
    Brand,
    InferCreationAttributes<ModelBrand>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Наименование. */
    declare name: string;
}

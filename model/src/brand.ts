import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';

export type FindBrand = FindOptions<Brand>;

/** Бренд. */
export type Brand = InferAttributes<ModelBrand, { omit: never}>;

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

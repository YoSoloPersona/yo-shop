import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    FindOptions
} from 'sequelize';
import { Brand } from 'yo-shop-model';

export type FindBrand = FindOptions<Brand>;

/** Модель бренда. */
export class ModelBrand
    extends Model<
        InferAttributes<ModelBrand, { omit: never }>,
        InferCreationAttributes<ModelBrand>
    >
    implements Brand
{
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Наименование. */
    declare name: string;
}

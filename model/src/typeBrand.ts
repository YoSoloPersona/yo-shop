import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';

/** Тип бренда. */
export type TypeBrand = InferAttributes<ModelTypeBrand>;

/** Модель типа бренда. */
export class ModelTypeBrand extends Model<
    TypeBrand,
    InferCreationAttributes<ModelTypeBrand>
> {
    declare id: CreateOptions<number>;
}

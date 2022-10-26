import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';
import { TypeBrand } from 'yo-shop-model';

/** Модель типа бренда. */
export class ModelTypeBrand
    extends Model<
        InferAttributes<ModelTypeBrand>,
        InferCreationAttributes<ModelTypeBrand>
    >
    implements TypeBrand
{
    declare id: CreateOptions<number>;
}

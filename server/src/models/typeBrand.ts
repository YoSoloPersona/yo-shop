import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/**  */
export class ModelTypeBrand extends Model<
    InferAttributes<ModelTypeBrand>,
    InferCreationAttributes<ModelTypeBrand>
> {
    declare id: CreateOptions<number>;
}

ModelTypeBrand.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
    },
    {
        sequelize,
        tableName: 'typeBrand'
    }
);

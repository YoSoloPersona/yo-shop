import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

export type Rating = InferAttributes<ModelRating>;

/** Модель рейтинга. */
export class ModelRating extends Model<
    Rating,
    InferCreationAttributes<ModelRating>
> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Рейтинг. */
    declare rate: number;
}

ModelRating.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        rate: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
        sequelize,
        tableName: 'rating'
    }
);

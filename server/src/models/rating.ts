import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import { Rating } from 'yo-shop-model';

// local
import { sequelize } from '../db/sequelize';

/** Модель рейтинга. */
export class ModelRating
    extends Model<
        InferAttributes<ModelRating>,
        InferCreationAttributes<ModelRating>
    >
    implements Rating
{
    /** Идентификатор в БД. */
    declare id?: number;

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

import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions,
    DataTypes
} from 'sequelize';

// local
import { sequelize } from '../db/sequelize';

/** Модель рейтинга. */
export class ModelRating extends Model<InferAttributes<ModelRating>, InferCreationAttributes<ModelRating>> {
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Рейтинг. */
    declare rate: number;
}

ModelRating.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false }
}, {
    sequelize, tableName: 'rating'
});
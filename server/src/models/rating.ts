import {
    DataTypes,
    Model
} from 'sequelize';
import { Rating } from '@YoSoloPersona/yo-shop-model';

// local
import { sequelize } from '../db';

/** Модель рейтинга. */
export class ModelRating
    extends Model<
        Rating,
        Rating
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
        id: { 
            type: DataTypes.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        rate: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        }
    },
    {
        sequelize,
        tableName: 'rating'
    }
);

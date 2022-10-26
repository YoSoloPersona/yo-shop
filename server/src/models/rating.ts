import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';
import { Rating } from 'yo-shop-model';

/** Модель рейтинга. */
export class ModelRating
    extends Model<
        InferAttributes<ModelRating>,
        InferCreationAttributes<ModelRating>
    >
    implements Rating
{
    /** Идентификатор в БД. */
    declare id: CreateOptions<number>;

    /** Рейтинг. */
    declare rate: number;
}

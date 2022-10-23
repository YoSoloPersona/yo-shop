import {
    InferAttributes,
    InferCreationAttributes,
    Model,
    CreateOptions
} from 'sequelize';

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
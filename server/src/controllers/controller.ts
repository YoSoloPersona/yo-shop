import {
    InferAttributes,
    FindOptions,
    Model,
    WhereOptions
} from 'sequelize/types';

/**
 * Интерфейс контроллера REST.
 */
export default interface Controller<T extends Model> {
    /** Ищет необходимые элементы. */
    findAll(option?: FindOptions<T>): Promise<InferAttributes<T>[]>;

    /** Ищет необходимый элемент. */
    findOne(option?: FindOptions<T>): Promise<InferAttributes<T> | null>;

    /** Добавляет элемент. */
    add(el: InferAttributes<T>): Promise<InferAttributes<T>>;

    /** Удаляет элемент. */
    remove(option?: WhereOptions<InferAttributes<T>>): Promise<number>;
}
